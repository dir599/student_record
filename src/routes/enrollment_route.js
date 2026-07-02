import { Router } from "express";
import { enrollmentStudentInCourse } from "../handlers/enrollment_handler.js";

const router = Router();

router.post("/enroll", enrollmentStudentInCourse);


export default router;
