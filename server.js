import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log(err));

app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);

app.listen(5000, ()=>{
    console.log("Server connected");
});

// uvMVep8T6azRkUpW
// mongodb+srv://admin:<password>@cluster0.montnjd.mongodb.net/