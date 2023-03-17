import mongoose from "mongoose"

const clientSchema = new mongoose.Schema({

    firstName : {
        type : String
    },
    city : {
        type : String
    },
    description : {
        type : String
    }
})


clientSchema.set('timestamps',true)

const Client = mongoose.model('Client',clientSchema)

export default Client