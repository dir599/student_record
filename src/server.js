import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/routes.js'
import { addRequestTimestampMiddleware, customErrorMiddleware, customSuccessMiddleware } from './middleware/add_request_timestamp_middleware.js'
dotenv.config()



let app = express()
app.use(express.json())
// middleware to add request timestamp to request objects
app.use("/req-time",(req,res)=> {
    addRequestTimestampMiddleware , (req,res)=>{
        res.status(200).json({
            message: "request timestamp added to request object",
            data: req.requestTimeStamp
        })
    }

})
app.use("/cerr", (req, res, next)=>{
    try{
        throw new Error("custom error throws error")
    }catch(e){
        next(e)
    }
})

app.get("/cdata", (req,res, next)=>{
    next({
        msg: 'all data fetched',
        data: ['apple', 'dkfd'],
        trace: {
            method: "GET",
            router: "/cdata"
        }
    })
})


app.use("/", routes)

let PORT = process.env.PORT || 3000

app.get("/", (req,res)=>{
    res.json({
        message: "server initial routes called successfully"
    })
})

app.use(addRequestTimestampMiddleware)

app.use(customErrorMiddleware)

app.use(customSuccessMiddleware)


app.listen(PORT, ()=>{
    console.log(`the server is running in port ${PORT}, http://localhost:${PORT}`)
})
