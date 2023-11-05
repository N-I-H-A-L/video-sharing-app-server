import express from "express";
import { signUp, signIn, googleAuth } from "../controllers/auth.js";

const router = express.Router();

//Create a user
router.post("/signup", signUp);

//Sign In
router.post("/signin", signIn);

//Google Authentication
router.post("/google", googleAuth);

export default router;