import express from "express"
import { Request, Response } from "express-serve-static-core";
const router = express.Router();


router.get("/:id", (req:Request<{id: string}>, res:Response)=>{
    const id = req.params.id;
    if(!id) {
        throw new Error("No file id provided");
    }
})


export default router;