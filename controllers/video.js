import { errorHandler } from "../error.js";
import Video from "../models/Video.js";

export const getVideo = async (req, res, next) =>{
    try{
        const getVideo = await Video.findById(req.params.videoId);
        if(!getVideo) return next(errorHandler(404, "Video not found!"));
        res.send(200).json(getVideo);
    }
    catch(err){
        next(err);
    }
}

export const addVideo = async (req, res, next) =>{
    try{
        await Video.create({userId: req.user, ...req.body});
        res.status(200).json({
            "success": true,
            "message": "Video added successfully."
        });
    }
    catch(err){
        next(err);
    }
}

export const deleteVideo = async (req, res, next) =>{
    try{
        const getVideo = Video.findById(req.params.videoId);
        if(!getVideo) return next(errorHandler(404, "Video not found!"));

        //If the video belongs to the logged in user then only the user can update the video.
        if(getVideo.userId===req.user.id){
            await Video.findByIdAndDelete(req.params.videoId);
            res.status(200).json({
                "success": true,
                "message": "Video has been deleted successfully."
            });
        }
        else{
            return next(errorHandler(400, "You can only delete your videos."));
        }
    }
    catch(err){
        next(err);
    }
}

export const updateVideo = async (req, res, next) =>{
    try{
        const getVideo = await Video.findById(req.params.videoId);
        if(!getVideo) return next(errorHandler(404, "Video not found!"));

        //If the video belongs to the logged in user then only the user can update the video.
        if(getVideo.userId===req.user.id){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.videoId, {
                $set: req.body,
            }, {new: true});
            res.status(200).json(updatedVideo);
        }
        else{
            return next(errorHandler(400, "You can only update your videos."));
        }
    }
    catch(err){
        next(err);
    }
}

export const updateViews = (req, res, next)=>{
    try{

    }
    catch(err){
        next(err);
    }
}

export const trendingVideos = (req, res, next)=>{
    try{

    }
    catch(err){
        next(err);
    }
}

export const randomVideos = (req, res, next)=>{
    try{

    }
    catch(err){
        next(err);
    }
}

export const subVideos = (req, res, next)=>{
    try{

    }
    catch(err){
        next(err);
    }
}
