import { Router } from 'express'
import {  FindAllDepartments, CreateDepartment, FindDepartmentById, UpdateDepartment, DeleteDepartment } from '../handlers/department_handler.js'


const router = Router()

router.get(
    "/", FindAllDepartments
)

// for read
router.get(
    "/:id", FindDepartmentById
)

// for write
router.post(
    "/", CreateDepartment
)


// for replace
router.put(
    "/:id", UpdateDepartment
)


// to delete
router.delete(
    "/:id", DeleteDepartment
)

export default router