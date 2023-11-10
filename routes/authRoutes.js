import express from "express";
import { signUp, signIn, googleAuth, logout } from "../controllers/auth.js";

const router = express.Router();

//Create a user
router.post("/signup", signUp);

//Sign In
router.post("/signin", signIn);

//Google Authentication
router.post("/google", googleAuth);

//Logout
router.delete("/logout", logout);

export default router;