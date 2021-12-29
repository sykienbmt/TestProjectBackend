

export interface Product{
    id:string;
    price:number;
    name:string;
    image?:string;
}

export const listIphone:Product[]=[
    {
        id:"12",
        price:400,
        name:"Iphone 8",
        image:"https://hoanghamobile.com/Uploads/2020/09/16/iPhone-8-Plus.png"
    },
    {
        id:"13",
        price:103,
        name:"Iphone 12",
        image:"https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg"
    },
    {
        id:"14",
        price:1033,
        name:"Iphone 11",
        image:"http://product.hstatic.net/1000329106/product/iphone-11-green-600x600_a67ef78c81764d87a1913092dfb68789_grande.png"
    },
    {
        id:"16",
        price:1666,
        name:"Iphone X",
        image:"https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg"
    },
    {
        id:"17",
        price:1777,
        name:"Iphone 13",
        image:"https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-silver-600x600.jpg"
    },
    {
        id:"18",
        price:1888,
        name:"Iphone 6 Plus",
        image:"https://didongviet.vn/pub/media/catalog/product//i/p/iphone-6-plus-didongviet_7.jpg"
    },
    {
        id:"19",
        price:1999,
        name:"Iphone 9",
        image:"https://www.viettablet.com/images/detailed/27/iphone-9-cu-like-new.png"
    }
]



// export const getListProduct =()=>{
//     let listIphoneLocal = localStorage.getItem('listProduct')
//     let listPro:Product[]=[];
//     if (listIphoneLocal) {
//         const list = JSON.parse(listIphoneLocal)
//         if(list.length===0){
//             localStorage.setItem('listProduct',JSON.stringify(listIphone))
//             listPro=listIphone
//         }else{
//             listPro=list
//         }
//     }else{
//         localStorage.setItem('listProduct',JSON.stringify(listIphone))
//         listPro=listIphone
//     }
//     return listPro
// }


