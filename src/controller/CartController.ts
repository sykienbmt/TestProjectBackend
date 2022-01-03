import { Request, Response } from 'express';
import { request } from 'http';
import { OrderProduct } from '../model/OrderProduct';

import { addProductToCart, deleteProductFromCart, getOrderList, getOrderListWithPagination, getProductFromCart, getTotalFromCart, updateQuantity } from '../services/CartService';
const { v4: uuid } = require('uuid');



export const handleGetProductFromCart = async (req: Request, res: Response) => {
    const id_order=req.body.id_order
    const data = await getProductFromCart(id_order)
    return res.json(data)
}

export const handleAddProductToCart = async (req: Request, res: Response) => {
    let order_product:OrderProduct=req.body
    const data =await addProductToCart(order_product)
    return res.json(data)
}


export const handleDeleteProductFromCart = async (req: Request, res: Response) => {
    let order:OrderProduct=req.body
    await deleteProductFromCart(order)
    return res.json('delete+ update total done')
}

export const handleGetTotalFromCart = async (req: Request, res: Response) => {
    const id_order=req.body.id_order
    const data = await getTotalFromCart(id_order)
    return data
}


export const handleUpdateQuantityProductFromCart = async (req: Request, res: Response) => {
    let order:OrderProduct=req.body
    await updateQuantity(order)
    return res.json('add product to cart done')
}


export const handleGetOrderList = async (req: Request, res: Response): Promise<Response> => {
    const id_user=req.body.id_user
    const data = await getOrderList(id_user)
    return res.json(data);
}

export const handleGetOrderListWithPagination= async (req:Request,res:Response)=>{
    const orderPagination=req.body
    const{id_user,page,perPage}=orderPagination
    const data = await getOrderListWithPagination(id_user,page,perPage)
    return res.json(data)
}