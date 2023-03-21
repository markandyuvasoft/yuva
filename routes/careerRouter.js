import express from "express"
import carrerController from "../controller/careerController.js"

const careerRouter = express.Router()

careerRouter.post("/career",carrerController.create)


export default careerRouter