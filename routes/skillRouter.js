import express from "express"
import skillController from "../controller/skillController.js"

const skillRouter = express.Router()

skillRouter.post("/skill",skillController.create)

skillRouter.get("/skill",skillController.fetchAll)

skillRouter.get("/skill/:id",skillController.fetch)

skillRouter.put("/skill/:id",skillController.update)

skillRouter.delete("/skill/:id",skillController.destroy)






export default skillRouter