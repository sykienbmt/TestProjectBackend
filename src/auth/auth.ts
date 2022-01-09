import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/UserService';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();


const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET || "testToken"

const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers['authorization'];
    // const token= authorizationHeaders?.split(" ")[1];
    
    // if(!token) return res.json({statusCode:401,mess:"Unauthorized"}).status(401);
    if(!token) return res.status(401).json({statusCode:401,mess:"Unauthorized"});
    
    try {
        const data=jwt.verify(token,ACCESS_TOKEN_SECRET)
        req.body.data=data  
        next()
    } catch (error) {
        // return res.json({statusCode:403,mess:"Forbidden"}).status(403);
        return res.status(403).json({statusCode:403,mess:"Forbidden"});
    }

}

export default verifyToken;