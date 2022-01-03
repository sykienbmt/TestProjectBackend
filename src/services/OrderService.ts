import { QueryResult } from "pg";
import { pool } from "../db";
import Order from "../model/Order";
const { v4: uuid } = require('uuid');

export const addOrder = async (id_user:string,id_order:string) => {
    await pool.query(`update "order" set is_temporary=false,time_order=NOW()::timestamp where id_user=$1 and id_order=$2`,[id_user,id_order])
}

export const getUserOrderInfo = async (id_user:string)=> {
    const checkUser:QueryResult=await pool.query(`select * from "order" where id_user=$1 and is_temporary=true`,[id_user])
    if(checkUser.rows.length===0){
        await pool.query(`insert into "order" values($1,$2,$3,$4)`,[uuid(),id_user,0,true]);
    }
    const response: QueryResult = await pool.query(`select * from "order" where id_user=$1 and is_temporary=true`,[id_user]);
    const order:Order=response.rows[0]
    return ({order})
}