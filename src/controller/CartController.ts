import { Request, Response } from 'express';
import { pool } from '../db';
import { QueryResult } from 'pg';
import { Order_product } from '../model/Order_product';
import Order from '../model/Order';
const { v4: uuid } = require('uuid');


export const getUserOrderInfo = async (req: Request, res: Response)=> {
    const id_user:string=req.body.id_user
    const checkUser:QueryResult=await pool.query(`select * from order oc where id_user=$1 and is_temporary=true`,[id_user])
    if(checkUser.rows.length===0){
        await pool.query(`insert into order values($1,$2,$3,$4)`,[uuid(),id_user,0,true]);
    }
    const response: QueryResult = await pool.query(`select * from order where id_user=$1`,[id_user]);
    const user_order:Order=response.rows[0]
    // return res.status(200).json({user_order});
}


//get list product in cart
export const getProductFromCart = async (req: Request, res: Response) => {

    const response:QueryResult=await pool.query(`select id_order,p.id id,name,p.price,quantity,image from order_product o join product p on o.id=p.id where id_order=$1
    `,[req.body.id_order]);
    console.log(response.rows);
    
    return res.json(response.rows)
}

export const addProductToCart = async (req: Request, res: Response) => {
    let order:Order_product=req.body
    console.log(order);
    
    // const {id_order,id,quantity,price}=order
    const checkProductExist: QueryResult = await pool.query(`select quantity from order_product op where id_order='e08a0870-de7d-49a5-b512-ddc92053d07a' and id='13'`);
    // console.log(checkProductExist.rows[0]);
    let set:string="";
    if(checkProductExist.rows.length==0){
        console.log("chua ton tai");
        await pool.query(`insert into order_product values($1,$2,$3,$4)`,["e08a0870-de7d-49a5-b512-ddc92053d07a",13,1,500]);
        set='add new product to cart done';
    }else{
        console.log("da ton tai");
        await pool.query(`update order_product set quantity=quantity+1 where id_order=$1 and id=$2`,["e08a0870-de7d-49a5-b512-ddc92053d07a",12]);
        set='change quantity done';
    }
    return res.json(set)
}

export const update = async (req: Request, res: Response) => {
    let order:Order_product=req.body
    const {id_order,id,quantity,price}=order
    const response: QueryResult = await pool.query(`update order set quantity=$1,price=$2 where id_order=$3 and id=$4`,[quantity,price,]);
    return res.json('add product to cart done')
}



