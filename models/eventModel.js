import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({

    title : {
        type : String
    },
    description : {
        type : String
    },
    location : {
        type : String
    },
    date : {
        type : String
    }

})

eventSchema.set('timestamps',true)

const Event = mongoose.model('Event',eventSchema)

export default Event