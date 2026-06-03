import { CreateStudednt, DeleteStudent, FindAllStudents, FindStudentById, UpdateStudent } from '../handlers/handler.js'
import router from './routes.js'

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