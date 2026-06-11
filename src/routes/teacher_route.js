import { Router } from 'express'
import { createdTeacher, DeleteTeacher, FindAllTeachers, FindTeacherById, UpdateTeacher } from '../handlers/teacher_handler.js'


const router = Router()

router.get(
    "/", FindAllTeachers
)

// for read
router.get(
    "/:id", FindTeacherById
)

// for write
router.post(
    "/", createdTeacher
)


// for replace
router.put(
    "/:id", UpdateTeacher
)


// to delete
router.delete(
    "/:id", DeleteTeacher
)

export default router