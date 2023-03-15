import express from 'express'
import designationController from "../controller/designationController.js"

const designationRouter = express.Router()


designationRouter.post("/createDesignation",designationController.createDesignation)

designationRouter.get("/getDesignation",designationController.getDesignation)

designationRouter.put("/updateDesignation/:id",designationController.updateDesignation)

designationRouter.delete("/deleteDesignation/:id",designationController.deleteDesignation)





export default designationRouter