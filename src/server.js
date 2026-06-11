import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/routes.js'
dotenv.config()



let app = express()
app.use(express.json())
app.use("/", routes)

let PORT = process.env.PORT || 3000

app.get("/", (req,res)=>{
    res.json({
        message: "server initial routes called successfully"
    })
})


app.listen(PORT, ()=>{
    console.log(`the server is running in port ${PORT}, http://localhost:${PORT}`)
})
