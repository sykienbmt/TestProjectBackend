import { Request, Response } from 'express';
import { OrderProduct } from '../model/OrderProduct';
import { cartService } from '../services/CartService';
const { v4: uuid } = require('uuid');


class CartController{
    
    getCarts = async (req: Request, res: Response) => {
        const id_order=req.body.id_order
        const data = await cartService.getProductFromCart(id_order)
        return res.json(data)
    }
    
    create = async (req: Request, res: Response) => {
        let order_product:OrderProduct=req.body
        const data =await cartService.create(order_product)
        return res.json(data)
    }
    
    
    delete = async (req: Request, res: Response) => {
        let order:OrderProduct=req.body
        await cartService.delete(order)
        return res.json('delete+ update total done')
    }
    
    getTotal = async (req: Request, res: Response) => {
        const id_order=req.body.id_order
        const data = await cartService.getTotal(id_order)
        return data
    }
    
    
    update = async (req: Request, res: Response) => {
        let order:OrderProduct=req.body
        await cartService.update(order)
        return res.json('add product to cart done')
    }
    
    
}



export const cartController = new CartController()

