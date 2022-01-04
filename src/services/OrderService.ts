import { QueryResult } from "pg";
import { pool } from "../dbConnect/db";
import Order, { OrderWithDetailAddress } from "../model/Order";
const { v4: uuid } = require('uuid');

class OrderService{
    add = async (id_user:string,id_order:string) => {
        await pool.query(`update "order" set is_temporary=false,time_order=NOW()::timestamp where id_user=$1 and id_order=$2`,[id_user,id_order])
    }
    
    get = async (id_user:string)=> {
        const checkUser:QueryResult=await pool.query(`select * from "order" where id_user=$1 and is_temporary=true`,[id_user])
        if(checkUser.rows.length===0){
            await pool.query(`insert into "order" values($1,$2,$3,$4)`,[uuid(),id_user,0,true]);
        }
        const response: QueryResult = await pool.query(`select * from "order" where id_user=$1 and is_temporary=true`,[id_user]);
        const order:Order=response.rows[0]
        return ({order})
    }

    list = async (id_user:string,page:number,perPage:number)=> {
        const userOrders:QueryResult= await pool.query(`select op.id_order,o.id_user,to_char(o.time_order , 'HH24:MI:SS - DD/MM/YYYY') time_order,o.total , op.id,op.price ,op.quantity,
        p."name" ,p.image ,u."name" nameUser,u.address ,u.phone ,u.email from "user" u join "order" o on u.id_user =o.id_user 
        join order_product op on op.id_order =o.id_order
        join product p on p.id =op.id
        where o.id_user =$1 and op.id_order in (select id_order from "order" where is_temporary=false order by time_order desc
        LIMIT $2 OFFSET (($3-1) * $2))
        order by o.time_order desc`,[id_user,perPage,page])
        const queryCount:QueryResult=await pool.query(`select count(*)  from "order" where is_temporary=false`)
        const totalPage=Math.ceil(queryCount.rows[0].count/perPage)
        const listFull=userOrders.rows
        let listOrder:OrderWithDetailAddress[]=[]
    
        let listIdOrder:string[]=[]
    
        listFull.map(item=>listIdOrder.push(item.id_order))
        listIdOrder=Array.from(new Set(listIdOrder))
        listIdOrder.map(id_order=>{
            const order :OrderWithDetailAddress = {
                id_order:id_order,
                id_user:id_user,
                total:0,
                is_temporary:false,
                timeOrder:"",
                orderProducts:[],
                userInfo:{
                    id_User:"",
                    address:"",
                    email:"",
                    name:"",
                    phone:""
                }
            }
            
    
            listFull.map(item2=>{
                if(item2.id_order==id_order){
                    order.total=item2.total
                    order.timeOrder=item2.time_order,
                    order.orderProducts.push({
                        id_order:item2.id_order,
                        id:item2.id,
                        quantity:item2.quantity,
                        price:item2.price,
                        product:{
                            id:item2.id,
                            name:item2.name,
                            price:item2.price,
                            image:item2.image
                        }
                    });
                    order.userInfo={id_User:item2.id_user,address:item2.address,email:item2.email,name:item2.username,phone:item2.phone}
                }
            })
            listOrder.push(order)
        })
    
        return {listOrder,totalPage}
    }

}

export const orderService = new OrderService()