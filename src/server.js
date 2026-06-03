import express, { json } from 'express'
import dotenv from 'dotenv'
import studentRouter from './routes/student_routes.js'
dotenv.config()



let app = express()
app.use(express.json())
app.use("/student", studentRouter)
let PORT = process.env.PORT || 3000

app.get("/", (req,res)=>{
    res.json({
        message: "server initial routes called successfully"
    })
})


app.listen(PORT, ()=>{
    console.log(`the server is running in port ${PORT}, http://localhost:${PORT}`)
})
