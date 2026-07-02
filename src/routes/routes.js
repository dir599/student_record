import { Router } from "express";
import studentRouter from './student_routes.js'
import departmentRouter from './department_route.js'
import teacherRouter from './teacher_route.js'
import courseRouter from './course_router.js'
import enrollRouter from './enrollment_route.js'
import authRouter from './auth_router.js'


let router = new Router()
router.use("/student", studentRouter)
router.use("/department", departmentRouter)
router.use("/teacher", teacherRouter)
router.use("/course", courseRouter)
router.use("/enrolled", enrollRouter  )
router.use("/router", authRouter)



export default router