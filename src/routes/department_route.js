import { Router } from 'express'
import {  FindAllDepartments, FinddepartmentById, CreateDepartment, Updatedepartment, Deletedepartment } from '../handlers/department_handler.js'


const router = Router()

router.get(
    "/", FindAllDepartments
)

// for read
router.get(
    "/:id", FinddepartmentById
)

// for write
router.post(
    "/", CreateDepartment
)


// for replace
router.put(
    "/:id", Updatedepartment
)


// to delete
router.delete(
    "/:id", Deletedepartment
)

export default router