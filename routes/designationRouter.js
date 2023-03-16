import express from 'express'
import designationController from "../controller/designationController.js"

const designationRouter = express.Router()


designationRouter.post("/designation",designationController.createDesignation)

designationRouter.get("/designation",designationController.getDesignation)

designationRouter.get("/designation/:id",designationController.designationId)

designationRouter.put("/designation/:id",designationController.updateDesignation)

designationRouter.delete("/designation/:id",designationController.deleteDesignation)





export default designationRouter