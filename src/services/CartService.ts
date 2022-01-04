import { QueryResult } from "pg";
import { pool } from "../db";
import Order, { OrderWithDetailAddress } from "../model/Order";
import { OrderProduct } from "../model/OrderProduct";
const { v4: uuid } = require('uuid');

export const getProductFromCart = async (id_order:string) => {   
    const response:QueryResult=await pool.query(`select p.id id,p.price price,name,image,quantity from order_product o join product p on o.id=p.id where id_order=$1
    `,[id_order]);
    let sum=0
    response.rows.map(item=>{
        sum+=item.price*item.quantity
    })
    await pool.query(`update "order" set total =$1 where id_order=$2`,[sum,id_order])
    
    return response.rows
}

export const addProductToCart = async (order_product:OrderProduct) => {
    const {id_order,id,quantity,price}=order_product
    console.log(order_product);
    
    const checkProductExist: QueryResult = await pool.query(`select quantity from order_product op where id_order=$1 and id=$2`,[id_order,id]);

    if(checkProductExist.rows.length==0){
        await pool.query(`insert into order_product values($1,$2,$3,$4)`,[id_order,id,quantity,price]);
    }else{
        await pool.query(`update order_product set quantity=quantity+1 where id_order=$1 and id=$2`,[id_order,id]);
    }
}

export const deleteProductFromCart = async (order:OrderProduct) => {
    const {id_order,id,quantity,price}=order
    await pool.query(`delete from order_product where id_order =$1 and id =$2`,[id_order,id]);
    // const minusPrice=price*quantity
    // await pool.query(`update "order" set total = total - $1 where id_order=$2`,[minusPrice,id_order])
}

export const getTotalFromCart = async (id_order:string) => {
    const money:QueryResult=await pool.query(`select total from "order" where id_order=$1`,[id_order]);
    
    return money.rows[0].total
}

export const updateQuantity = async (order:OrderProduct) => {
    const {id_order,id,quantity,price}=order
    // const quantityBefore = await pool.query(`select quantity from order_product where id_order=$1 and id=$2`,[id_order,id])
    // const before=quantityBefore.rows[0].quantity
    await pool.query(`update order_product set quantity=$1,price=$2 where id_order=$3 and id=$4`,[quantity,price,id_order,id]);
    // const currentPrice = (quantity-before)*price
    // await pool.query(`update "order" set total = total + $1 where id_order=$2`,[currentPrice,id_order])
}


export const getOrderList = async (id_user:string)=> {
    const userOrders:QueryResult= await pool.query(`select op.id_order,o.id_user,to_char(o.time_order , 'DD/MM/YYYY || HH24:MI:SS') time_order,o.total , op.id,op.price ,op.quantity,p."name" ,p.image ,u."name" nameUser,u.address ,u.phone ,u.email from "user" u join "order" o on u.id_user =o.id_user 
    join order_product op on op.id_order =o.id_order
    join product p on p.id =op.id
    where o.id_user =$1
    order by o.time_order desc`,[id_user])
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

    return listOrder
    
}


export const getOrderListWithPagination = async (id_user:string,page:number,perPage:number)=> {
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