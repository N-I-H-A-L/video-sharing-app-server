import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addComment, deleteComment, getComments } from "../controllers/comment.js";

const router = express.Router();

//Add comment
router.post('/', verifyToken, addComment);
//Delete comment
router.delete('/:commentId', verifyToken, deleteComment);
//Get all the comments for a particular video (no need to sign for getting comments)
router.get('/:videoId', getComments);

export default router;