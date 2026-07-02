import { Router } from 'express'
import { CreateStudent, CreateStudentWithDepartment, DeleteStudent, FindAllStudents, FindStudentById, getAllStudentsWithSelect, sortStudents, UpdateStudent } from '../handlers/student_handler.js'


const router = Router()
router.get(
    "/", FindAllStudents
)

// for read
router.get(
    "/get-student-with-select", getAllStudentsWithSelect
)
router.get(
    "/get-student-with-asc", sortStudents
)
router.get(
    "/:id", FindStudentById
)

// for write
router.post(
    "/", CreateStudent
)
router.post("/with-depart", CreateStudentWithDepartment)


// for replace
router.put(
    "/:id", UpdateStudent
)


// to delete
router.delete(
    "/:id", DeleteStudent
)

export default router