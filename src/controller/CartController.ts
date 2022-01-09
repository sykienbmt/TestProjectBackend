import { Request, Response } from 'express';
import { OrderProduct } from '../model/OrderProduct';
import { cartService } from '../services/CartService';
const { v4: uuid } = require('uuid');


class CartController{
    
    getCarts = async (req: Request, res: Response) => {
        const data = await cartService.getProductFromCart(req.body.data.id_user)
        return res.json(data)
    }
    
    create = async (req: Request, res: Response) => {
        let order_product:OrderProduct=req.body
        await cartService.create(order_product)
        const data = await cartService.getProductFromCart(req.body.data.id_user)
        return res.json(data)
    }
    
    
    delete = async (req: Request, res: Response) => {
        let order:OrderProduct=req.body
        await cartService.delete(order)
        const data = await cartService.getProductFromCart(req.body.data.id_user)
        return res.json(data)
    }
    
    getTotal = async (req: Request, res: Response) => {
        const id_order=req.body.id_order
        const data = await cartService.getTotal(id_order)
        return data
    }
    
    
    update = async (req: Request, res: Response) => {
        let order:OrderProduct=req.body
        await cartService.update(order)
        const list=await cartService.getProductFromCart(req.body.data.id_user);
        return res.json(list)
    }
    
    
}



export const cartController = new CartController()

