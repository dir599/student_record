import { Router } from 'express'
import { CreateStudednt, DeleteStudent, FindAllStudents, FindStudentById, UpdateStudent } from '../handlers/student_handler.js'


const router = Router()
router.get(
    "/", FindAllStudents
)

// for read
router.get(
    "/:id", FindStudentById
)

// for write
router.post(
    "/", CreateStudednt
)


// for replace
router.put(
    "/:id", UpdateStudent
)


// to delete
router.delete(
    "/:id", DeleteStudent
)

export default router