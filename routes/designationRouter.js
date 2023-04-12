import express from 'express'
import designationController from "../controller/designationController.js"
import checkauth from "../middleware/auth.js"

const designationRouter = express.Router()


designationRouter.post("/designation",checkauth,designationController.create)

designationRouter.get("/designation",checkauth,designationController.fetchAll)

designationRouter.get("/designation/:id",designationController.fetch)

designationRouter.put("/designation/:id",designationController.update)

designationRouter.delete("/designation/:id",designationController.destroy)





export default designationRouter