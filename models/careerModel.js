import mongoose from "mongoose";


const careerSchema = new mongoose.Schema({

    name : {
        type : String
    },
<<<<<<< HEAD
    skill : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Skill"
    }],
=======
    skill : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Skill"
    },
>>>>>>> featur/development
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

<<<<<<< HEAD
export default Career
=======
export default Career
>>>>>>> featur/development
