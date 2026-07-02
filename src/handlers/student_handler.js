import prisma from "../db/prisma.js";
import { nameValidatorSchema, UpdateStudentValidatorSchema } from "../validators/validatro.js";

let FindAllStudents = async (req, res) => {
  try {
    // select is used to  specify which fields to retrieve from the database,
    // which include is used to specify related models to include in the result,
    // please either use `include` or `select`, but not both at same time.
    let allStudents = await prisma.students.findMany({
      // select: {
      //   id: true,
      //   name: true,
      //   roll: true,
      //   email: true,
      // },
      include: {
        enrollment: {
          include: {
            course: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json({
      message: "all students found",
      data: allStudents,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "cannot find student",
    });
  }
};

// wrong
const getAllStudentsWithSelect = async (req, res) => {
  let students = await prisma.students.findMany({
    select: {
      name: true,
      roll: true,
      email: true,
      id: true,
      
      
      department: {
        select: {
          id: true,
          name: true,
        },
      },
      enrollment: true,
      
    },
  });
  res.status(200).json({
    message: "student created with select successfully",
    data: students,
  });
};

export let sortStudents = async (req, res) => {
  try {
    let students = await prisma.students.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return res.status(200).json({
      message: "students sorted data",
      data: students,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "cannot sort student",
    });
  }
};

let FindStudentById = async (req, res) => {
  try {
    let id = req.params.id;

    // check if id is number not and must return status related to it
    if (isNaN(id)) {
      return res.status(404).json({
        error: "id must be number",
      });
    }
    let matchStudent = await prisma.students.findUnique({
      where: {
        id: Number(req.params.id),
        
      },include: {
          enrollment: {
            include: {
              course: true,
            },
          },
          department: true,
        },
    });
    if (!matchStudent) {
      return res.status(404).json({
        message: "student id not found",
      });
    }
    res.status(200).json({
      message: "student  found",
      data: matchStudent,
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "cannot find studentBy id",
    });
  }
};

const CreateStudent = async (req, res) => {
  // passing body data using zod  validator schema
  
  try {
    let result = nameValidatorSchema.safeParse(req.body)
    console.log("result", result)
    if(!result.success){
      let errors = result.error.errors.map((ele)=>{
        return {
          field: ele.path[0],
          message: ele.message
        }
      })
       res.status(400).json({
        message: 'something went wrong',
        errors: errors
       })
    }
    let data = req.body;
    let { name, email, roll, departmentId } = data;
    // let validateMsg = ValidateEmptyField("email", email)
    // if(validateMsg != null){
    //   res.status(400).json({
    //     error: validateMsg
    //   })
    //   return
    // }
    let createdStudent = await prisma.students.create({
      data: {
        name,
        email,
        roll,
        department: {
          connect: { id: departmentId },
        },
      },
    });
    res.status(201).json({
      message: "student created successfully",
      data: createdStudent,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "cannot find student",
    });
  }
};
let CreateStudentWithDepartment = async (req, res) => {
  try {
    let data = req.body;
    let { name, email, roll, departmentName } = data;
    // let validateMsg = ValidateEmptyField("email", email)
    // if(validateMsg != null){
    //   res.status(400).json({
    //     error: validateMsg
    //   })
    //   return
    // }
    let createdStudent = await prisma.students.create({
      data: {
        name,
        email,
        roll,
        department: {
          create: {
            name: departmentName,
          },
        },
      },
    });
    res.status(201).json({
      message: "student created successfully",
      data: createdStudent,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "cannot find student",
    });
  }
};

let UpdateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    UpdateStudentValidatorSchema.parse(req.body)

    const { name, roll, email } = req.body;
    let updatedData = await prisma.students.update({
      where: {
        id: Number(studentId),
      },
      data: {
        name: name,
        roll: roll,
        email: email,
      },
    });

    res.status(200).json({
      message: "student updated successfully",
      data: updatedData,
    });
  } catch (e) {
    if(e instanceof z.ZodError) {
      let error = e.issues.map((ele)=>{
        return {
          field: ele.path[0],
          message: ele.message
        }
      })
    }
    res.status(500).json({
      message: "cannot find id",
    });
  }
};
let DeleteStudent = async (req, res) => {
  try {
    let id = req.params.id;
    let deletedStudent = await prisma.students.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: `student with id ${id} deleted successfully`,
      data: deletedStudent,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot delete",
    });
  }
};

export {
  FindAllStudents,
  getAllStudentsWithSelect,
  FindStudentById,
  CreateStudent,
  CreateStudentWithDepartment,
  UpdateStudent,
  DeleteStudent,
};
