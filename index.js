import express, { json } from 'express'
import dotenv from 'dotenv'
dotenv.config()



let app = express()
app.use(express.json())
let PORT = process.env.PORT || 3000

app.get("/", (req,res)=>{
    app.send("This is home page")
})


app.listen(PORT, ()=>{
    console.log(`the server is running in port ${PORT}`)
})
