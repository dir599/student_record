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
      message: "all students found",
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
    // check if id is number not and must return status related to it
    if (isNaN(id)) {
      res.status(404).json({
        error: "id must be number",
      });
    }
    let matchCourse = await prisma.course.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({
      message: "department found",
      data: matchCourse,
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
    let {name, credit, teacherId} = data;
    let createdCourse = await prisma.course.create({
      // name: {},
      // data: data,
      data:{
        name,
        credit,
        teacher: {
          connect: {id: teacherId},
        },
      }
    });
    res.status(201).json({
      message: "department created successfully",
      data: createdCourse,
    });
  } catch (e) {
    console.log(e)
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
    let DeletedCourse = await prisma.course.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: `department with id ${id} deleted successfully`,
      data: DeletedCourse,
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
