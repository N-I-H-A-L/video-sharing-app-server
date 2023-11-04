import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log(err));

app.listen(5000, ()=>{
    console.log("Server connected");
});

// uvMVep8T6azRkUpW
// mongodb+srv://admin:<password>@cluster0.montnjd.mongodb.net/