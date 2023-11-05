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
            return next(err);
        }
    }
    else{
        return next(errorHandler(403, "You can update only your account."));
    }
}

export const deleteUser = async (req, res, next) =>{
    
}

export const getUser = async (req, res, next) =>{
    
}

export const subUser = async (req, res, next) =>{
    
}

export const unsubUser = async (req, res, next) =>{
    
}

export const likeVideo = async (req, res, next) =>{
    
}

export const dislikeVideo = async (req, res, next) =>{
    
}