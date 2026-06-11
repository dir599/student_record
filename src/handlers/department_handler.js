import prisma from "../db/prisma.js";

let FindAllDepartments = async (req, res) => {
  try {
    let allDepartments = await prisma.department.findMany({
      include: {
        students: true,
        teachers: true,
      },
    });
    res.json({
      message: "all studnets found",
      data: allDepartments,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot find department",
    });
  }
};

let FinddepartmentById = async (req, res) => {
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
    let matchdepartment = await prisma.department.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({
      message: "All department found",
      data: matchdepartment,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot find departmentBy id",
    });
  }
};

let CreateDepartment = async (req, res) => {
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
    let createddepartment = await prisma.department.create({
      data: data,
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

let Updatedepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const { name, email } = req.body;
    let updatedData = await prisma.department.update({
      where: {
        id: Number(departmentId),
      },
      data: {
        name: name
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
let Deletedepartment = async (req, res) => {
  try {
    let id = req.params.id;
    let deleteddepartment = await prisma.department.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: `department with id ${id} deleted sucedfully`,
      data: deleteddepartment,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot delete",
    });
  }
};

export {
  FindAllDepartments,
  FinddepartmentById,
  CreateDepartment,
  Updatedepartment,
  Deletedepartment,
};
