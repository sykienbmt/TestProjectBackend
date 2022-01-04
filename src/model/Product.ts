

export interface Product{
    id:string;
    price:number;
    name:string;
    image?:string;
}

export interface ItemCart extends Product{
    quantity:number
}