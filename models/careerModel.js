import mongoose from "mongoose";


const careerSchema = new mongoose.Schema({

    name : {
        type : String
    },
    skill : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Skill"
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