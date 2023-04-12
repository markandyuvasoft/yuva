import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    category : {
        type : String
    },
    description : {
        type : String
    },
    title : {
        type : String
    },
    date : {
        type : String
    }
})

blogSchema.set('timestamps',true)

const Blog = mongoose.model('Blog',blogSchema)

export default Blog