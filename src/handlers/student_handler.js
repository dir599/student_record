import prisma from "../db/prisma.js";

let FindAllStudents = async (req, res) => {
  try{
    let allStudents = await prisma.students.findMany();
  res.json({
    message: "all studnets found",
    data: allStudents,
  });
  }catch(e){
    res.status(500).json({
      message: "cannot find student"
    })
  }
};

let FindStudentById = async (req, res) => {
  try{
    let id = req.params.id
    // empty validation
    if (id === " "){
      res.status(404).json({
        error: "id cannot be empty"
      })
      return
    }
     // check if id is number not and must return status releated to it
     if(isNaN(id)){
      res.status(404).json({
        error: "id must be number"
      })
     }
    let matchStudent = await prisma.students.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(200).json({
    message: "student found",
    data: matchStudent,
  });
  }catch(e){
    res.status(500).json({
      message: "cannot find studentBy id"
    })
    
  }
};

let CreateStudednt = async (req, res) => {
  try{
    let data = req.body;
    let {email, name, roll, departmentId} = data
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
      department:{
        connect: {id: departmentId}
      }

    }
  });
  res.status(201).json({
    message: "student created successfully",
    data: createdStudent,
  });
  }catch(e) {
    console.log(e)
    res.status(500).json({
      message: "cannot find student"
    })
    
    
  }
};


let UpdateStudent = async (req, res) => {
  try{
    const studentId = req.params.id;

  const { name, email } = req.body;
  let updatedData = await prisma.students.update({
    where: {
      id: Number(studentId),
    },
    data: {
      name: name,
      email: email,
    }
  });

  res.status(200).json({
    message: "student updated successfully",
    data: updatedData,
  });
  }catch(e){
     res.status(500).json({
      message: "cannot find id"
    })
    
  }
}
let DeleteStudent = async (req, res) => {
  try{
    let id = req.params.id
  let deletedStudent = await prisma.students.delete({
    where:{
      id: Number(id)
    }
})
res.status(200).json({
  message: `student with id ${id} delted sucedfully`,
  data: deletedStudent
})
  }catch(e){
    res.status(500).json({
      message: "cannot delete"
    })
  }
};

export {
  FindAllStudents,
  FindStudentById,
  CreateStudednt,
  UpdateStudent,
  DeleteStudent,
};
