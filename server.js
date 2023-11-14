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

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log(err));

const corsoptions = {
    //to allow requests from client
    origin: "*",
    credentials: true,
    //credentials should be true for setting cookies.
};

app.get('/', (req, res)=>{
    res.status(200).send("Server is up and running!");
});

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

app.listen(PORT, ()=>{
    console.log("Server connected");
});
