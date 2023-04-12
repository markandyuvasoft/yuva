import express from "express"
import blogController from "../controller/blogController.js"

const blogRouter = express.Router()

blogRouter.post("/blog",blogController.create)

blogRouter.get("/blog",blogController.fetchAll)

blogRouter.get("/blog/:id",blogController.fetch)

blogRouter.put("/blog/:id",blogController.update)

blogRouter.delete("/blog/:id",blogController.destroy)




export default blogRouter