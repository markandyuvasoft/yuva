import express from 'express'
import teamController from '../controller/teamController.js'
import upload from '../image/image.js'

const teamRouter = express.Router()

teamRouter.post("/team",upload.single('teamProfile'),teamController.createTeam)

teamRouter.get("/team",teamController.getTeam)




export default teamRouter