import mongoose from "mongoose";


const careerSchema = new mongoose.Schema({

    name : {
        type : String
    },
    skill : {
        type : String
    },
    location : {
        type : String
    },
    experience : {
        type : String
    },
    logo : {
        type : String
    }
})

careerSchema.set('timestamps',true)

const Career = mongoose.model("Career",careerSchema)

export default Career