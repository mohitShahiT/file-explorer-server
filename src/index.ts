import express from "express"
import {Request, Response} from "express-serve-static-core"
const app = express()

const PORT = 3000

app.use("/test", (req:Request, res:Response)=>{
    console.log(req.headers);
    res.status(200).json({
        status: "success",
        message: "server is live"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})



