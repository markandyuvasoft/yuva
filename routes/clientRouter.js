import express from "express"
import clientController from "../controller/clientController.js"


const clientRouter = express.Router()

clientRouter.post("/client",clientController.createClient)


export default clientRouter