import express from "express";
import { updateUser, deleteUser, getUser, subUser, unsubUser, likeVideo, dislikeVideo, updateProfile } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Always verify the user (verifyToken) before performing any operations.

//Update the user with ID, "id"
router.put("/:id", verifyToken, updateUser);

//Delete the user with ID, "id"
router.delete("/:id", verifyToken, deleteUser);

//Find the user with ID, "id"
router.get("/find/:id", getUser);
//You don't need to be logged in (verifyToken) to find users (channels, in case of MeTube).

//Subscribe the user with ID as "id"
router.put("/sub/:id", verifyToken, subUser);

//Unsubscribe the user with ID as "id"
router.put("/unsub/:id", verifyToken, unsubUser);

//Like the video with ID as "videoId"
router.put("/like/:videoId", verifyToken, likeVideo);

//Dislike the video with ID as "videoId"
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

//Update profile picture of user
router.post("/profile", verifyToken, updateProfile);

export default router;