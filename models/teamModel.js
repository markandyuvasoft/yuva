import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({

    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    contact : {
        type : Number
    },
    designation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Designation"
    },
    teamProfile : {
        type : String
    }
})

teamSchema.set('timestamps',true)


const Team = mongoose.model('Team',teamSchema)

export default Team