import { Request, Response } from 'express';
import { orderService } from '../services/OrderService';


class OrderController{
    update = async (req: Request, res: Response) => {
        await orderService.update(req.body.id_user,req.body.id_order)
        return res.json('order done')
    }

    getUserInfo = async (req: Request, res: Response)=> {
        const id_user:string=req.body.id_user
        let data=await orderService.get(id_user)
        return res.json(data);
    }

    list= async (req:Request,res:Response)=>{
        const orderPagination=req.body
        const{id_user,page,perPage}=orderPagination
        const data = await orderService.list(id_user,page,perPage)
        return res.json(data)
    }
}

export const orderController = new OrderController()

