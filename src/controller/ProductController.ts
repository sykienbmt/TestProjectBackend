import { Request, Response } from 'express';
import { pool } from '../db';
import { QueryResult } from 'pg';
import { Product } from '../model/Product';
import { Pagination } from '../model/Pagination';
import { productService } from '../services/ProductService';


class ProductController{

    list = async (req: Request, res: Response) => {
        const item:Pagination=req.body
        let obj=await productService.list(item)
        return res.json(obj)
    }
    
    get = async (req: Request, res: Response): Promise<Response> =>{
        const id:string =req.params.id
        const data= await productService.get(id)
        return res.json(data)
    }
    
    add = async (req: Request, res: Response) => {
        let product:Product=req.body
        await productService.add(product)
        return res.json('add product done')
    }
    
    update = async (req: Request, res: Response) => {
        let product:Product=req.body
        await productService.update(product)
        return res.json('update product done')
    }
    
    delete = async (req: Request, res: Response) => {
        let id=req.params.id
        await productService.delete(id)
        return res.json('delete product done')
    }
    
}

export const productController= new ProductController()