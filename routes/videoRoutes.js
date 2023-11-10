import express from "express";
import { addVideo, getVideo, updateVideo, deleteVideo, updateViews, trendingVideos, randomVideos, subVideos, searchVideos, getVideosByTags } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Adding a video
router.post('/', verifyToken, addVideo);
//Getting a video
router.get('/find/:videoId', verifyToken, getVideo);
//Updating a video
router.put('/:videoId', verifyToken, updateVideo);
//Deleting a video
router.delete('/:videoId', verifyToken, deleteVideo);
//Updating number of views of video
router.put('/view/:videoId', verifyToken, updateViews);
//Get trending videos
router.get('/trend', trendingVideos);
//Get random videos (for Home page)
router.get('/random', randomVideos);
//Get videos of subscribed channels
router.get('/subscribed', verifyToken, subVideos);
//Get videos by tags
router.get('/tags', verifyToken, getVideosByTags);
//Search videos by title
router.get('/search', searchVideos);

export default router;