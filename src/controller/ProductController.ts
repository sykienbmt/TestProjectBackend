import { Request, Response } from 'express';
import { pool } from '../db';
import { QueryResult } from 'pg';
import { Product } from '../model/Product';
import { Pagination } from '../model/Pagination';
import { addProduct, deleteProduct, getListProduct, getProductDetail, shopPagination, updateProduct } from '../services/ProductService';

export const handleGetListProduct = async (req: Request, res: Response): Promise<Response> => {
    const data= await getListProduct()
    return res.json(data);
}

export const handleGetProductDetail = async (req: Request, res: Response): Promise<Response> =>{
    const id:string =req.params.id
    const data= await getProductDetail(id)
    return res.json(data)
}

export const handleAddProduct = async (req: Request, res: Response) => {
    let product:Product=req.body
    await addProduct(product)
    return res.json('add product done')
}

export const handleUpdateProduct = async (req: Request, res: Response) => {
    let product:Product=req.body
    await updateProduct(product)
    return res.json('update product done')
}

export const handleDeleteProduct = async (req: Request, res: Response) => {
    let id=req.params.id
    await deleteProduct(id)
    return res.json('delete product done')
}

export const showShopPagination = async (req: Request, res: Response) => {
    const item:Pagination=req.body
    let obj=await shopPagination(item)
    return res.json(obj)
}


