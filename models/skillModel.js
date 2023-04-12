import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({

    name : {
        type : String
    }
})

skillSchema.set("timestamps",true)

const Skill = mongoose.model("Skill",skillSchema)

export default Skill