import { errorHandler } from "../error.js";
import User from "../models/User.js";
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

export const updateViews = async (req, res, next)=>{
    try{
        const getVideo = await Video.findById(req.params.videoId);
        if(!getVideo) return next(errorHandler(404, "Video not found!"));

        await Video.findByIdAndUpdate(req.params.videoId, {
            $inc: {views: 1}
        });
        res.json(200).send({
            success: true,
            message: "Updated views successfully."
        });
    }
    catch(err){
        next(err);
    }
}

export const trendingVideos = async (req, res, next)=>{
    try{
        //It will sort the videos according to number of views, and since the query is {views: -1}, it will sort in descending order, that is, the videos with highest number of views will be retrieved first.
        const videos = await Video.find().sort({views: -1});
        res.status(200).json(videos);
    }
    catch(err){
        next(err);
    }
}

export const randomVideos = async (req, res, next)=>{
    try{
        //It will get a random 'sample' of 40 videos from the database.
        const videos = await Video.aggregate( [ {$sample: {size: 40} } ] );
        res.status(200).json(videos);
    }
    catch(err){
        next(err);
    }
}

export const subVideos = async (req, res, next)=>{
    try{
        const user = await User.findById(req.user.id);
        //Get the list of subscribedChannels by the logged in user.
        const subscribedChannels = user.subscribedUsers;

        //Create a list of all the videos of the subscribedChannels.
        const list = await Promise.all(
            subscribedChannels.map(async (channelId)=>{
                //Add the videos of channel to the list.
                return await Video.find({userId: channelId});
            })
        );
        res.status(200).json(list);
    }
    catch(err){
        next(err);
    }
}
