import zod, { email } from 'zod'
export let registerUserValidationSchema = zod.object({
    email: zod.email("email is invalid"),
    username: zod.string().min(4, " username must be minimum 4 characters long"),
    password: zoc.string().min(6, "Password must be minimum 6 character long")
})

export let loginUserValidationSchema = zod.object({
    email: zoc.email("please provide the valid email"),
    password: zod.string().min(1, "password is required")
})

