import prisma from "../db/prisma.js";

let FindAllStudents = async (req, res) => {
  let allStudents = await prisma.students.findMany();
  res.json({
    message: "all studnets found",
    data: allStudents,
  });
};

let FindStudentById = async (req, res) => {
  let matchStudent = await prisma.students.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(200).json({
    message: "student found",
    data: matchStudent,
  });
};

let CreateStudednt = async (req, res) => {
  let data = req.body;
  let createdStudent = await prisma.students.create({
    data: data,
  });
  res.status(201).json({
    message: "student created successfully",
    data: createdStudent,
  });
};
let UpdateStudent = async (req, res) => {
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
}
let DeleteStudent = async (req, res) => {};

export {
  FindAllStudents,
  FindStudentById,
  CreateStudednt,
  UpdateStudent,
  DeleteStudent,
};
