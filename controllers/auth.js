import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

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

export const signIn = (req, res) => {

};

export const googleAuth = (req, res) => {

};