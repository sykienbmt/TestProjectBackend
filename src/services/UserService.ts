import { QueryResult } from "pg";
import { pool } from "../dbConnect/db";
import Order from "../model/Order";
import { Pagination } from "../model/Pagination";
import { Product } from "../model/Product";
const { v4: uuid } = require('uuid');


export const getUserInfo = async (id_user:string)=> {
    const checkUser:QueryResult = await pool.query(`select * from "user" where id_user=$1`,[id_user])
    return checkUser.rows[0]
}