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

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1); // Exit if connection fails
  }
};

if (process.env.NODE_ENV !== "test") {
  (async () => {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server connected");
    });
  })();
}

const corsoptions = {
  //to allow requests from client
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "https://video-sharing-app-eight.vercel.app",
    "https://video-sharing-2k6ztdfj8-n-i-h-a-l.vercel.app",
  ],
  credentials: true,
  //credentials should be true for setting cookies.
};

app.get("/", (req, res) => {
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
app.use((err, req, res, next) => {
  //If status code is not provided set it to 500.
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    message,
  });
});

export default app;
