import {ItemCart} from "./ItemCart";


export interface OrderTest{
    buyerId: string ,
    orderId:string,
    name:string ,
    address:string ,
    email:string ,
    phone:string ,
    time:number,
    listOrder: ItemCart[]
}

let  item2:ItemCart={id: "13",image: "https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg",
name: "iphone 12",
price: 103,
quantity: 11}
export const orders:OrderTest[]=[{buyerId:"Starr",orderId:'123123123',name:'KienNguyen',address:"Tp.Bmt",email:"kiennspk01738@fpt.edu.vn",phone:"0946761639",time:1640700880841,listOrder:[item2]}];