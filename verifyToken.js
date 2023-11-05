import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) =>{
    //Since in the auth SignIn Controller, access_token is stored in the cookies, the subsequent requests will be able to access the access_token.
    const token = req.cookies.access_token;
    
    //If access_token (the token which is added to cookies when user logs in) is not present:
    if(!token) return next(errorHandler(401, "You are not authenticated."));

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        //If the token is invalid, it will lead to error:
        if(err) return next(errorHandler(403, "Invalid Token!"));
        //If token is valid, "user" will contain the decoded information which was stored as token. 
        req.user = user;

        //next() will execute the next handler function for the route. 
        //For example if route is: router.put("/:id", verifyToken, updateUser);
        //Then next() will execute the updateUser function.
        next();
    });
}