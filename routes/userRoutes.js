import express from "express";
import { updateUser, deleteUser, getUser, subUser, unsubUser, likeVideo, dislikeVideo } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Update the user with ID, "id"
router.put("/:id", verifyToken, updateUser);

//Delete the user with ID, "id"
router.delete("/:id", deleteUser);

//get a user -> Find the user with ID, "id"
router.get("/find/:id", getUser);

//Subscribe the user with ID as "id"
router.put("/sub/:id", subUser);

//Unsubscribe the user with ID as "id"
router.put("/unsub/:id", unsubUser);

//Like the video with ID as "videoId"
router.put("/like/:videoId", likeVideo);

//Dislike the video with ID as "videoId"
router.put("/dislike/:videoId", dislikeVideo);

export default router;