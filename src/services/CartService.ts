import { QueryResult } from "pg";
import { pool } from "../dbConnect/db";
import { OrderProduct } from "../model/OrderProduct";
const { v4: uuid } = require('uuid');

class CartService{

    getProductFromCart = async (id_order:string) => {   
        const response:QueryResult=await pool.query(`select p.id id,p.price price,name,image,quantity from order_product o join product p on o.id=p.id where id_order=$1
        `,[id_order]);
        return response.rows
    }
    
    create = async (order_product:OrderProduct) => {
        const {id_order,id,quantity,price}=order_product
        const checkProductExist: QueryResult = await pool.query(`select quantity from order_product op where id_order=$1 and id=$2`,[id_order,id]);
        if(checkProductExist.rows.length==0){
            await pool.query(`insert into order_product values($1,$2,$3,$4)`,[id_order,id,quantity,price]);
        }else{
            await pool.query(`update order_product set quantity=quantity+1 where id_order=$1 and id=$2`,[id_order,id]);
        }
    }
    
    delete = async (order:OrderProduct) => {
        const {id_order,id,quantity,price}=order
        await pool.query(`delete from order_product where id_order =$1 and id =$2`,[id_order,id]);
    }
    
    getTotal = async (id_order:string) => {
        const money:QueryResult=await pool.query(`select total from "order" where id_order=$1`,[id_order]);
        return money.rows[0].total
    }
    
    update = async (order:OrderProduct) => {
        const {id_order,id,quantity,price}=order
        await pool.query(`update order_product set quantity=$1,price=$2 where id_order=$3 and id=$4`,[quantity,price,id_order,id]);
    }

}

export const cartService = new CartService()