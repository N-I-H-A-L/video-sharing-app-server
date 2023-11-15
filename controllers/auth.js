import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //Encrypted password will be stored in the database. 
        await User.create({...req.body, password: hash})
            .then((result)=>{
                const token = jwt.sign({id: result._id}, process.env.JWT_SECRET);
                res.cookie("access_token", token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: "false"
                }).status(200).json(result);
            })
            .catch((err)=>{
                res.status(401).json(err);
            });
    }
    catch(err){
        //It will trigger the Error Handling Middleware of server.js file.
        next(err);
    }
};

export const signIn = async (req, res, next) => {
    try{
        const user = req.body.name;
        const password = req.body.password;
    
        //Find the user data from the database
        const getUser = await User.findOne({name: user});
        //If user is not present:
        if(!getUser){
            //Why sending the error function inside "next" function?
            //At first, the errorHandler function will be created, it will create an error with status as 404 and message as "User not found".
            //Then the next() function will call the Error Handler function mentioned in the server.js file (middleware), then that function will actually generate the error. 
            return next(errorHandler(404, "User not found"));
        }
    
        const isCorrect = bcrypt.compare(password, getUser.password);
    
        //If password is wrong:
        if(!isCorrect) return next(errorHandler(400, "Wrong Credentials"));
    
        //First argument is the payload, value which is to be encoded and second argument is the secret key.
        const token = jwt.sign({id:getUser._id}, process.env.JWT_SECRET);
        
        //Store the token in the cookies
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: "false"
        }).status(200).json(getUser);
    }
    catch(err){
        next(err);
    }
};

export const googleAuth = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        //If user is already present in database.
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        
            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: "false"
            }).status(200).json(user);
        }
        //Else create new user.
        else{
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET);
        
            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: "false"
            }).status(200).json(savedUser);
        }
    }
    catch(err){
        next(err);
    }
};

export const logout = async (req, res, next) =>{
    try{
        //Delete the access_token from cookies.
        res.clearCookie("access_token");
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    }
    catch(err){
        next(err);
    }
}