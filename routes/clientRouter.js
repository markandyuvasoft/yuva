import express from "express"
import clientController from "../controller/clientController.js"


const clientRouter = express.Router()

clientRouter.post("/client",clientController.create)

clientRouter.get("/client",clientController.fetchAll)

clientRouter.get("/client/:id",clientController.fetch)

clientRouter.put("/client/:id",clientController.update)

clientRouter.delete("/client/:id",clientController.destroy)






export default clientRouter