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
        await User.create({...req.body, password: hash});
        res.status(200).json({
            success: "true",
            message: "User created successfully"
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
            httpOnly: true
        }).status(200).json(getUser);
    }
    catch(err){
        next(err);
    }
};

export const googleAuth = (req, res) => {

};