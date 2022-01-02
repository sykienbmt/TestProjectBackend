import { Request, Response } from 'express';
import { pool } from '../db';
import { QueryResult } from 'pg';
import { Order_product } from '../model/Order_product';
import Order from '../model/Order';
const { v4: uuid } = require('uuid');


export const getUserOrderInfo = async (req: Request, res: Response)=> {
    const id_user:string=req.body.id_user
    const checkUser:QueryResult=await pool.query(`select * from "order" where id_user=$1 and is_temporary=true`,[id_user])
    
    if(checkUser.rows.length===0){
        await pool.query(`insert into "order" values($1,$2,$3,$4)`,[uuid(),id_user,0,true]);
    }
    const response: QueryResult = await pool.query(`select * from "order" where id_user=$1 and is_temporary=true`,[id_user]);
   
    const order:Order=response.rows[0]
    return res.status(200).json({order});
}

export const getUserInfo = async (req: Request, res: Response)=> {
    const id_user:string=req.body.id_user
    const checkUser:QueryResult=await pool.query(`select * from "user" where id_user=$1`,[id_user])
    return res.status(200).json(checkUser.rows[0]);
}


export const getProductFromCart = async (req: Request, res: Response) => {
    const id_order=req.body.id_order
    const response:QueryResult=await pool.query(`select p.id id,p.price price,name,image,quantity from order_product o join product p on o.id=p.id where id_order=$1
    `,[id_order]);
    let sum=0
    response.rows.map(item=>{
        sum+=item.price*item.quantity
    })
    await pool.query(`update "order" set total =$1 where id_order=$2`,[sum,id_order])
    return res.json(response.rows)
}

export const addProductToCart = async (req: Request, res: Response) => {
    let order_product:Order_product=req.body
    const {id_order,id,quantity,price}=order_product
    
    const checkProductExist: QueryResult = await pool.query(`select quantity from order_product op where id_order=$1 and id=$2`,[id_order,id]);

    if(checkProductExist.rows.length==0){
        await pool.query(`insert into order_product values($1,$2,$3,$4)`,[id_order,id,quantity,price]);
    }else{
        await pool.query(`update order_product set quantity=quantity+1 where id_order=$1 and id=$2`,[id_order,id]);
    }
    // await pool.query(`update "order" set total = total+ $1 where id_order=$2`,[price,id_order]);
    // const money=await pool.query(`select total from "order" where id_order=$1`,[id_order]);
    return res.json("add done")
}


export const deleteProductFromCart = async (req: Request, res: Response) => {
    let order:Order_product=req.body
    console.log(order);
    const {id_order,id,quantity,price}=order

    await pool.query(`delete from order_product where id_order =$1 and id =$2`,[id_order,id]);

    // const minusPrice=price*quantity

    // await pool.query(`update "order" set total = total - $1 where id_order=$2`,[minusPrice,id_order])
    return res.json('delete+ update total done')
}

export const getTotalFromCart = async (req: Request, res: Response) => {
    const id_order=req.body.id_order
    const money=await pool.query(`select total from "order" where id_order=$1`,[id_order]);
    return res.json(money.rows[0].total)
}


export const updateQuantity = async (req: Request, res: Response) => {
    let order:Order_product=req.body
    console.log(order);
    
    const {id_order,id,quantity,price}=order
    // const quantityBefore = await pool.query(`select quantity from order_product where id_order=$1 and id=$2`,[id_order,id])
    // const before=quantityBefore.rows[0].quantity
    await pool.query(`update order_product set quantity=$1,price=$2 where id_order=$3 and id=$4`,[quantity,price,id_order,id]);
    // const currentPrice = (quantity-before)*price
    // await pool.query(`update "order" set total = total + $1 where id_order=$2`,[currentPrice,id_order])
    return res.json('add product to cart done')
}



