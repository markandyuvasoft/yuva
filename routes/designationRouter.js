import express from 'express'
import designationController from "../controller/designationController.js"

const designationRouter = express.Router()


designationRouter.post("/designation",designationController.create)

designationRouter.get("/designation",designationController.fetchAll)

designationRouter.get("/designation/:id",designationController.fetch)

designationRouter.put("/designation/:id",designationController.update)

designationRouter.delete("/designation/:id",designationController.destroy)





export default designationRouter