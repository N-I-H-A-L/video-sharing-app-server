import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log(err));

const corsoptions = {
    //to allow requests from client
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1",
    ],
    credentials: true,
    //credentials should be true for setting cookies.
};

app.use(cors(corsoptions));
app.use(cookieParser()); //To be able to use cookies.
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", authRoutes);

//Error Handler function
app.use((err, req, res, next)=>{
    //If status code is not provided set it to 500.
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        message
    });
});

app.listen(5000, ()=>{
    console.log("Server connected");
});
