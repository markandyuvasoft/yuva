import express from "express"
import clientController from "../controller/clientController.js"


const clientRouter = express.Router()

clientRouter.post("/client",clientController.createClient)

clientRouter.get("/client",clientController.getClients)

clientRouter.get("/client/:id",clientController.getClient)

clientRouter.put("/client/:id",clientController.updateClient)

clientRouter.delete("/client/:id",clientController.deleteClient)






export default clientRouter