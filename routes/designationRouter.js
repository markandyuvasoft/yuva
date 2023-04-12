import express from 'express'
import designationController from "../controller/designationController.js"
<<<<<<< HEAD
=======
import checkauth from "../middleware/auth.js"
>>>>>>> featur/development

const designationRouter = express.Router()


<<<<<<< HEAD
designationRouter.post("/designation",designationController.create)

designationRouter.get("/designation",designationController.fetchAll)
=======
designationRouter.post("/designation",checkauth,designationController.create)

designationRouter.get("/designation",checkauth,designationController.fetchAll)
>>>>>>> featur/development

designationRouter.get("/designation/:id",designationController.fetch)

designationRouter.put("/designation/:id",designationController.update)

designationRouter.delete("/designation/:id",designationController.destroy)





export default designationRouter