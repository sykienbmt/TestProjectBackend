import Order, { OrderWithDetail, OrderWithDetailAddress } from "./Order";
import { Product } from "./Product";

export interface OrderProduct{
    id_order: string,
    id: string,
    quantity:number,
    price:number
}

export interface OrderProductShow extends OrderProduct{
    product:Product
}



const order :OrderWithDetailAddress = {
    id_order:'123',
    id_user:"123",
    total:12333,
    is_temporary:false,
    timeOrder:"123",
    orderProducts:[
        {
            id_order:'123',
            id:'456',
            quantity:6,
            price:70000,
            product:{
                id:'456',
                name:'iphone',
                price:1234,
                image:'1234'
            }
        }],
    userInfo:{
        id_User:"123",
        address:"1234",
        email:"123@gmail.com",
        name:"starr",
        phone:"0987458475"
    }
}