import { errorHandler } from "../error.js";
import User from "../models/User.js"

export const updateUser = async (req, res, next) =>{
    //req.user will contain the ID of the user sent by verifyToken.
    const id = req.user.id;

    //If the current user's id (req.params.id) equals the ID sent by decoding the JWT token then only the user can update
    if(req.params.id===id){
        try{
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: req.body, //set the User's value as req.body.
            }, {new: true}); //On setting new: true, updatedUser will store the updated value of the user.
            res.status(200).json(updatedUser);
        }
        catch(err){
            next(err);
        }
    }
    else{
        return next(errorHandler(403, "You can update only your account."));
    }
}

export const deleteUser = async (req, res, next) =>{
    const id = req.user.id;
    if(req.params.id===id){
        try{
            await User.findByIdAndDelete(id);
            res.status(200).json({
                success: true,
                message: "User has been deleted successfully."
            });
        }
        catch(err){
            next(err);
        }
    }
    else{
        return next(errorHandler(403, "You can delete only your account."));
    }
}

export const getUser = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}

export const subUser = async (req, res, next) =>{
    try{
        //The logged in user. 
        //Note: User should be logged in before subscribing.
        const id = req.user.id;
        //The user (or channel), the logged in user wants to subscribe to.
        const toSubscribe = req.params.id;

        await User.findByIdAndUpdate(id, {
            //In the list of subscribedUsers of the logged in user, add the ID of the channel to which the user is subscribing to.
            $push: {subscribedUsers: toSubscribe},
        });

        await User.findByIdAndUpdate(toSubscribe, {
            //Increment the subscribers by 1 of the user who got subscribed.
            $inc: {subscribers: 1}
        });

        res.status(200).json({
            success: true,
            message: "Subscription successful."
        });
    }
    catch(err){
        next(err);
    }
}

export const unsubUser = async (req, res, next) =>{
    try{
        const id = req.user.id;
        const toUnsubscribe = req.params.id;
        await User.findByIdAndUpdate(id, {
            //'Pull' or remove the ID of the channel from the subscribedUsers list of the logged in user.
            $pull: {subscribedUsers: toUnsubscribe},
        });
        await User.findByIdAndUpdate(toUnsubscribe, {
            //Increment the number of subscribers by -1 (or decrement).
            $inc: {subscribers: -1}
        });
        res.status(200).json({
            success: true,
            message: "Unsubscription successful."
        });
    }
    catch(err){
        next(err);
    }
}

export const likeVideo = async (req, res, next) =>{
    try{

    }
    catch(err){
        next(err);
    }
}

export const dislikeVideo = async (req, res, next) =>{
    try{

    }
    catch(err){
        next(err);
    }
}