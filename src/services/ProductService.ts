import { QueryResult } from "pg";
import { pool } from "../db";
import { Pagination } from "../model/Pagination";
import { Product } from "../model/Product";


class ProductService{

    get = async (id:string) =>{
        const response: QueryResult = await pool.query('SELECT * FROM Product where id like $1',[id]);
        return response.rows[0]
    }

    add = async (product:Product) => {
        const {name,id,price,image}=product
        await pool.query(`insert into Product values ($1,$2,$3,$4)`,[id,price,name,image]);
    }

    update = async (product:Product) => {
        const {name,id,price,image}=product
        await pool.query(`update product set price=$1,name=$2,image=$3 where id=$4`,[price,name,image,id]);
    }

    delete = async (id:string) => {
        await pool.query(`delete from product where id=$1`,[id])
    }

    list = async (pagination:Pagination) => {
        
        const item:Pagination=pagination
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

        return obj
    }
}

export const productService = new ProductService()