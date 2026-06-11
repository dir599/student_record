import prisma from "../db/prisma.js";

let FindAllTeachers = async (req, res) => {
  try {
    let allTeachers = await prisma.teacher.findMany();
    res.json({
      message: "all studnets found",
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
    // check if id is number not and must return status releated to it
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
    let { email, name, roll_no, departmentId } = data;
    // let validateMsg = ValidateEmptyField("email", email);
    // if (validateMsg != null) {
    //   res.status(400).json({
    //     error: validateMsg,
    //   });
    //   return;
    // }
    let createdTeacher = await prisma.teacher.create({
      data: {
        name,
        email,
        roll_no,
        department: {
          connect: {
            id: Number(departmentId),
          },
        },
      },
    });
    res.status(201).json({
      message: "Teacher created successfully",
      data: createdTeacher,
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
    const TeacherId = req.params.id;

    const { name, email } = req.body;
    let updatedData = await prisma.teacher.update({
      where: {
        id: Number(TeacherId),
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
      message: `Teacher with id ${id} delted sucedfully`,
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
