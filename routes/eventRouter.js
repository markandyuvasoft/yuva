import express from "express"
import eventController from "../controller/eventController.js"


const eventRouter = express.Router()

eventRouter.post("/event",eventController.create)

eventRouter.get("/event/:id",eventController.fetch)

eventRouter.get("/event",eventController.fetchAll)

eventRouter.put("/event/:id",eventController.update)

eventRouter.delete("/event/:id",eventController.destroy)

eventRouter.delete("/event/:id",eventController.destroy)

eventRouter.get("/paginate",eventController.pagination)



export default eventRouter