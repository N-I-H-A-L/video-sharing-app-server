import { errorHandler } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) =>{
    try{
        await Comment.create({...req.body, userId: req.user.id})
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                res.status(401).json(err);
            });
    }
    catch(err){
        next(err);
    }
}

export const deleteComment = async (req, res, next) =>{
    try{
        //Get the comment
        const comment = await Comment.findById(req.params.commentId);
        //Get the video to which the comment belongs to
        const video = await Video.findById(comment.videoId);
        
        //If the owner of comment is the logged in user OR the logged in user is the owner of the video to which the comment is written, then only the comment can be deleted.
        if(comment.userId === req.user.id || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.commentId);
        }
        else{
            return next(errorHandler(403, "You cannot delete this comment."));
        }
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully."
        });
    }
    catch(err){
        next(err);
    }
}

export const getComments = async (req, res, next) =>{
    try{
        //Get the comments whose videoId matches with the videoId sent as params.
        const comments = await Comment.find({videoId: req.params.videoId});
        res.status(200).json(comments);
    }
    catch(err){
        next(err);
    }
}