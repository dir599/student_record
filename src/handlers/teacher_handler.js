import prisma from "../db/prisma.js";

let FindAllTeachers = async (req, res) => {
  try {
    let allTeachers = await prisma.teacher.findMany();
    res.json({
      message: "all teacher found",
      data: allTeachers,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot find Teacher",
    });
  }
};

let FindTeacherById = async (req, res) => {
  try {
    let id = req.params.id;
    // empty validation
    if (id === " ") {
      res.status(404).json({
        error: "id cannot be empty",
      });
      return;
    }
    // check if id is number not and must return status related to it
    if (isNaN(id)) {
      res.status(404).json({
        error: "id must be number",
      });
    }
    let matchTeacher = await prisma.teacher.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({
      message: "Teacher found",
      data: matchTeacher,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot find TeacherBy id",
    });
  }
};

let createdTeacher = async (req, res) => {
  try {
    let data = req.body;
    let { name, email,  departmentId } = data;
    // ✅ Check if teacher exists
    let departmentExists = await prisma.department.findUnique({
      where: { id: parseInt(departmentId) }
    });
    if(!departmentExists){
      res.status(404).json({
        message: "department doesn't exit"
      })
    }
   
    let createTeacher = await prisma.teacher.create({
      data: {
        name,
        email,
        
        department: {
          connect: {
            id: parseInt(departmentId),
          },
        },
      },
    });
    res.status(201).json({
      message: "Teacher created successfully",
      data: createTeacher,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      message: "cannot find Teacher",
    });
  }
};

let UpdateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { name , email } = req.body;
    console.log("body", req.body)


    //  checking or looking for teacher id
    let teacherExists = await prisma.teacher.findUnique({
      where: {id: parseInt(teacherId)}
    })
    if(!teacherExists){
      return res.status(404).json({
        message: "Teacher is not exists"
      })
    }



    let updatedData = await prisma.teacher.update({
      where: {
        id: Number(teacherId)
      },
      data: {
        name: name,
        email: email,
      },
    });

    res.status(200).json({
      message: "Teacher updated successfully",
      data: updatedData,
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "cannot find id",
    });
  }
};
let DeleteTeacher = async (req, res) => {
  try {
    let id = req.params.id;

    let deletedTeacher = await prisma.teacher.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: `Teacher with id ${id} deleted successfully`,
      data: deletedTeacher,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot delete",
    });
  }
};

export {
  FindAllTeachers,
  FindTeacherById,
  createdTeacher,
  UpdateTeacher,
  DeleteTeacher,
};
