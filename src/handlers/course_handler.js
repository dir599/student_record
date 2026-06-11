import prisma from "../db/prisma.js";

let FindAllCourses = async (req, res) => {
  try {
    let allCourses = await prisma.course.findMany({
      include: {
        students: true,
        teachers: true,
      },
    });
    res.json({
      message: "all studnets found",
      data: allCourses,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot find department",
    });
  }
};

let FindCourseById = async (req, res) => {
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
    let matchdepartment = await prisma.course.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({
      message: "department found",
      data: matchdepartment,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot find departmentBy id",
    });
  }
};

let CreateCourse = async (req, res) => {
  try {
    let data = req.body;
    // let { email, name, roll_no } = data;
    // let validateMsg = ValidateEmptyField("email", email)
    // if(validateMsg != null){
    //   res.status(400).json({
    //     error: validateMsg
    //   })
    //   return
    // }
    let createddepartment = await prisma.course.create({
      // name: {},
      // data: data,
      data:{
        name: name,
        data

      }
    });
    res.status(201).json({
      message: "department created successfully",
      data: createddepartment,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot find department",
    });
  }
};

let UpdateCourse = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const { name, email } = req.body;
    let updatedData = await prisma.course.update({
      where: {
        id: Number(departmentId),
      },
      data: {
        name: name,
        email: email,
      },
    });

    res.status(200).json({
      message: "department updated successfully",
      data: updatedData,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot find id",
    });
  }
};
let DeletedCourse = async (req, res) => {
  try {
    let id = req.params.id;
    let deleteddepartment = await prisma.course.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: `department with id ${id} delted sucedfully`,
      data: deleteddepartment,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot delete",
    });
  }
};

export {
  FindAllCourses,
  FindCourseById,
  CreateCourse,
  UpdateCourse,
  DeletedCourse,
};
