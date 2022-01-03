import { Request, Response } from 'express';
import { addOrder, getUserOrderInfo } from '../services/OrderService';

export const handleGetUserOrderInfo = async (req: Request, res: Response)=> {
    const id_user:string=req.body.id_user
    let order=await getUserOrderInfo(id_user)
    return res.json(order);
}

export const handleAddOrder = async (req: Request, res: Response) => {
    await addOrder(req.body.id_user,req.body.id_order)
    return res.json('order done')
}

