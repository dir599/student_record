import { Router } from 'express'
import { CreateCourse, DeletedCourse, FindAllCourses, FindCourseById, UpdateCourse } from '../handlers/course_handler.js'


const router = Router()

router.get(
    "/", FindAllCourses
)

// for read
router.get(
    "/:id", FindCourseById
)

// for write
router.post(
    "/", CreateCourse
)


// for replace
router.put(
    "/:id", UpdateCourse
)


// to delete
router.delete(
    "/:id", DeletedCourse
)

export default router