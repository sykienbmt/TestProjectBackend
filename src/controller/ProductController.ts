import { Request, Response } from 'express';
import { pool } from '../db';
import { QueryResult } from 'pg';
import { Product } from '../model/Product';
import { FilerShow } from '../model/FilerShow';

export const getListProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM Product');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const getProductDetail = async (req: Request, res: Response): Promise<Response> =>{
    const id:string =req.params.id
    const response: QueryResult = await pool.query('SELECT * FROM Product where id like $1',[id]);
    return res.status(200).json(response.rows[0]);
}

export const addProduct = async (req: Request, res: Response) => {
    let product:Product=req.body
    const {name,id,price,image}=product
    const response: QueryResult = await pool.query(`insert into Product values ($1,$2,$3,$4)`,[id,price,name,image]);
    return res.json('add product done')
}

export const updateProduct = async (req: Request, res: Response) => {
    let product:Product=req.body
    const {name,id,price,image}=product
    await pool.query(`update product set price=$1,name=$2,image=$3 where id=$4`,[price,name,image,id]);
    return res.json('update product done')
}

export const deleteProduct = async (req: Request, res: Response) => {
    let id=req.params.id
    console.log(id);
    const response: QueryResult = await pool.query(`delete from product where id=$1`,[id]);
    return res.json('delete product done')
}

export const shopPagination = async (req: Request, res: Response) => {
    
    const item:FilerShow=req.body
    const {search,filter,page,perPage}=item
    const response1: QueryResult = await pool.query(`select count(*) from product`);
    
    let response: QueryResult= await pool.query(`SELECT * FROM product LIMIT $2 OFFSET (($1-1) * $2)`,[page,perPage]);

    if(filter!==""){
        if(filter==="AZ"){
            response=await pool.query(`SELECT * FROM product where lower(name) like '%`+search.toLocaleLowerCase()+`%' order by name LIMIT $2 OFFSET (($1-1) * $2)`,[page,perPage])
        }else if(filter==="ZA"){
            response=await pool.query(`SELECT * FROM product where lower(name) like '%`+search.toLocaleLowerCase()+`%' order by name desc LIMIT $2 OFFSET (($1-1) * $2)`,[page,perPage])
        }else if(filter==="Ascend"){
            response=await pool.query(`SELECT * FROM product where lower(name) like '%`+search.toLocaleLowerCase()+`%' order by price LIMIT $2 OFFSET (($1-1) * $2)`,[page,perPage])
        }else if(filter==="Descend"){
            response=await pool.query(`SELECT * FROM product where lower(name) like '%`+search.toLocaleLowerCase()+`%' order by price desc LIMIT $2 OFFSET (($1-1) * $2)`,[page,perPage])
        }
    }
    let obj={
        list:response.rows,
        count:response1.rows[0].count
    }

    return res.json(obj)
}

export const addOrder = async (req: Request, res: Response) => {
    const id_user=req.body.id_user
    const id_order=req.body.id_order
    await pool.query(`update "order" set is_temporary=false where id_user=$1 and id_order=$2`,[id_user,id_order])
    return res.json('order done')
}

export const getOrderList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('select * from orderTest');
        console.log(response.rows);
        
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}