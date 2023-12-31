import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    },
    img:{
        type: String,
    },
    subscribers:{
        type: Number,
        default: 0
    },
    subscribedUsers:{
        //List of channels subscribed to
        type: [String]
    },
    fromGoogle:{
        type: Boolean,
        default: false,
    } 
}, {timestamps: true}); //It will store the timestamps of creation and updation.

export default mongoose.model("User", userSchema);