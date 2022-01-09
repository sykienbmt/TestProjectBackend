import { Request, Response } from 'express';
import { userService } from '../services/UserService';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET || "testToken"

class UserController{

    get = async (req: Request, res: Response)=> {
        const id_user:string=req.body.id_user
        const data =await userService.get(id_user)
        return res.json(data);
    }

    check= async (req: Request,res:Response)=>{
        const emailLogin=req.body.email
        const pass = req.body.pass
        const data =await userService.check(emailLogin,pass)
        const {id_user,name,address,phone,email}=data[0]
        if(data.length>0){
            const accessToken=jwt.sign({id_user},ACCESS_TOKEN_SECRET,{expiresIn: '300s'})
            return res.json({accessToken:accessToken}) 
        }
        return res.status(401).json('fail')
    }

    getMe = async (req:Request,res:Response)=>{
        const data= await userService.get(req.body.data.id_user)
        return res.json(data)
    }
}

export const userController = new UserController()

