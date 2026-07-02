import { success } from "zod"
import { loginUserValidationSchema, registerUserValidationSchema } from "../validators/auth_validator.js"
import bcrypt from 'bcrypt'
import prisma from '../db/prisma.js'
import { tr } from "zod/locales"


export let registerUserHandler = async(req, res)=>{
    // step 1: validate the incoming data or request data
    let result = registerUserValidationSchema.safeParse(req,body)
    if(!result.success) {
        let errors = result.error.issues.map((ele)=>{
            return {
                field: ele.path[0],
                message: ele.message,
            }

        })
        return res.status(400).json({
            success: false,
            message: "validation error",
            errors: errors
        })
    }
    let {email, password, username} = result.data
    try{
        // step 2: HASHED THE incoming password using bcrypt.hash(data, salt/round)
        let hashedPassword = await bcrypt.hash(password, 10)
        // step 3; STORE THE USER DATA
        let user = await prisma.user.create({
           data:{
             email: email,
            password: hashedPassword,
            username: username
           },
           select:{
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,

           }
        })
        // todo exclude or remove password from user
        res.status(201).json({
            success: true,
            message: `user registered successfully`,
            data: user
        })

    }catch(e){
        res.status(500).json({
            success: false,
            message: "something went wrong",
            stack: e
        })

    }

}

export let loginUser = asyncHandler(async (req, res) => {
  loginUserValidationSchema.parse(req.body);
  let { email, password } = req.body;
  let user = await prisma.users.findUnique({
    where: {
      email: email,
    }, 
  });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const token = await jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  ); 
  return res.status(200).json({
    success: true,
    message: `Login successful.`,
    token: token
  });
});