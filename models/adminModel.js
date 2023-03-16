import mongoose from "mongoose";
var Schema = mongoose.Schema;


const adminSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin:{
        default : false,
        type: Boolean
    },
    token : {
        type : String
    }
})


const Admin = mongoose.model("Admin", adminSchema);

export default Admin;