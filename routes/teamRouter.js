import express from 'express'
import teamController from '../controller/teamController.js'
import upload from '../image/image.js'

const teamRouter = express.Router()

teamRouter.post("/createTeam",upload.single('teamProfile'),teamController.createTeam)

teamRouter.get("/getTeam",teamController.getTeam)




export default teamRouter