import { errorHandler } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const getVideo = async (req, res, next) =>{
    try{
        const getVideo = await Video.findById(req.params.videoId);
        if(!getVideo) return next(errorHandler(404, "Video not found!"));
        res.status(200).json(getVideo);
    }
    catch(err){
        next(err);
    }
}

export const addVideo = async (req, res, next) =>{
    try{
        await Video.create({userId: req.user.id, ...req.body})
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

export const deleteVideo = async (req, res, next) =>{
    try{
        const getVideo = await Video.findById(req.params.videoId);
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
        else{
            await Video.findByIdAndUpdate(req.params.videoId, {
                $inc: {views: 1}
            });
            res.status(200).json({
                success: true,
                message: "Updated views successfully."
            });
        }
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

export const getVideosByTags = async (req, res, next) =>{
    //The tags will be sent as 'query' in the URL.
    //For example: localhost:5000/api/video/tags?tags=java,python,c
    const tags = req.query.tags.split(",");
    
    //console.log(req.query.tags);
    //Output: java,python,c
    //Then it will be splitted by "," and stored like an array:
    // console.log(tags);
    // [ 'java', 'python', 'c' ]

    try{
        //Get all the videos which contain the "tags" (of query) inside their own "tags" object. And limit the output to 20 items. Even if one of the tags will be present, it will include it.
        const videos = await Video.find({ tags: {$in: tags} }).limit(20);
        res.status(200).json(videos);
    }
    catch(err){
        next(err);
    }
}

export const searchVideos = async (req, res, next) =>{
    //It will search videos on the basis of title of the video.
    const query = req.query.q;
    try{
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
        }).limit(40); 
        //$options: "i" -> ignore the case of letters (uppercase or lowercase)
        //$regex: query -> it will find the videos with title containing exactly the "query".
        res.status(200).json(videos);
    }
    catch(err){
        next(err);
    }
}