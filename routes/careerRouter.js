import express from "express"
import carrerController from "../controller/careerController.js"
import upload from '../image/image.js'


const careerRouter = express.Router()

careerRouter.post("/career",upload.single('logo'),carrerController.create)

careerRouter.get("/career",carrerController.fetchAll)

careerRouter.get("/career/:id",carrerController.fetch)

careerRouter.put("/career/:id",upload.single('logo'),carrerController.update)

careerRouter.delete("/career/:id",carrerController.destroy)

export default careerRouter