import express from 'express'
import teamController from '../controller/teamController.js'
import upload from '../image/image.js'

const teamRouter = express.Router()

teamRouter.post("/team",upload.single('teamProfile'),teamController.createTeam)

teamRouter.get("/team",teamController.getTeam)

teamRouter.get("/team/:id",teamController.singleTeam)

teamRouter.put("/team/:id",upload.single('teamProfile'),teamController.updateTeam)

teamRouter.delete("/team/:id",teamController.deleteTeam)


export default teamRouter