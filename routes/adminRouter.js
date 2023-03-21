import express from 'express'
import adminController from '../controller/adminController.js'
import checkauth from "../middleware/auth.js"

const adminRouter = express.Router()

adminRouter.post("/register",adminController.adminRegister)

adminRouter.post("/login",adminController.adminLogin)

adminRouter.post("/logout",checkauth,adminController.logout)



export default adminRouter