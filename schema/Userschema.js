import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min : 5,
        max : 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        min : 8,
    },

})



export default mongoose.model("User" , UserSchema)