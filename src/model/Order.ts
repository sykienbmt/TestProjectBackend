import { UserInfo } from "os";
import { OrderProduct, OrderProductShow } from "./OrderProduct";
import { User } from "./User";

export default interface Order{
    id_order:string,
    id_user:string,
    total:number,
    is_temporary:boolean
    timeOrder:string
}

export interface OrderWithDetail extends Order{
    orderProducts: OrderProductShow[]
}

export interface OrderWithDetailAddress extends OrderWithDetail{
    userInfo:User
}