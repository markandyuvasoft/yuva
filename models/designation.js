import mongoose from "mongoose"
var Schema = mongoose.Schema

const designationSchema = new mongoose.Schema({

    name : {
        type : String
    }
})


designationSchema.set('timestamps',true)

const Designation =  mongoose.model('Designation',designationSchema)

export default Designation