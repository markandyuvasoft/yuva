import express from 'express'
import adminController from '../controller/adminController.js'

const adminRouter = express.Router()

adminRouter.post("/register",adminController.adminRegister)

adminRouter.post("/login",adminController.adminLogin)



export default adminRouter