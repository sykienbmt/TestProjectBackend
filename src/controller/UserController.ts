import { Request, Response } from 'express';
import { getUserInfo } from '../services/UserService';



class UserController{

    get = async (req: Request, res: Response)=> {
        const id_user:string=req.body.id_user
        const data =getUserInfo(id_user)
        return res.json(data);
    }

}

export const userController = new UserController()

