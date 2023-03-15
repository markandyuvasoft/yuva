import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors";

import adminRouter from "./routes/adminRouter.js";
import designationRouter from "./routes/designationRouter.js";
import teamRouter from "./routes/teamRouter.js";

import *as path from 'path'

dotenv.config()

const app=express();


// midleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors())
mongoose.set('strictQuery',true);

// routes
app.use("/api/v1",adminRouter)
app.use("/api/v1",designationRouter)
app.use("/api/v1",teamRouter)





// welcome side
app.get('/',(req,res)=>{
    res.status(200).send("welcome to yuvasoft")
})


app.use('/image', express.static('images'));



const PORT=process.env.PORT||8000

// connect mongo db atlas
mongoose.connect(process.env.MONGO_URL,{usenewurlparser:true,}).then(()=>{
    console.log("connected to mongodb atlas")
}).catch(error=>{
console.log("something wrong")
})


// server port
app.listen(PORT,()=>{
    console.log("server started at port http://localhost:8000");
})