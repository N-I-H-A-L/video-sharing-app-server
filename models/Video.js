import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String, //ID of the user who uploaded the video
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String, //Thumbnail URL
      required: true,
    },
    videoUrl: {
      type: String, //Video will be uploaded in google storage and the link of the video in the storage will be provided here.
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String], //User IDs of users who liked the video.
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);