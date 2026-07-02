import { registerUserHandler } from "../handlers/auth_handler.js";
// import router from "./student_routes.js";


const router =  router()
router.get("/check", registerUserHandler)



export default router