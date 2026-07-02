import  {email, z } from "zod";
import { UpdateStudent } from "../handlers/student_handler.js";

export let nameValidatorSchema = z.string().max(2, "name must be of minimum 2 letters").max(100, "name must not exceed 100")
// .optional 

export let emailValidatorSchema = z.email("email must be valid.")

export let createStudentValidatorSchema = z.object({
    name: nameValidatorSchema,
    email: emailValidatorSchema 
})
export let  idValidator = z.int().negative()
export let idValidatorSchema = z.object({
    id: idValidator
})

export let UpdateStudentValidatorSchema = z.object({
    name: nameValidatorSchema.optional(),
    email: emailValidatorSchema.optional()
})
