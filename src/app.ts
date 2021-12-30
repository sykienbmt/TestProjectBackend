const { Pool, Client} = require("pg");

import express, {Request, Response} from 'express'
import { FilerShow } from './model/FilerShow'
import { orders, OrderTest } from './model/OrderTest'
import { Product ,listIphone } from './model/Product'
import router from './Routes';
var cors = require('cors')


const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());
app.use(router)


let list:Product[]=listIphone


app.get('/product/detail/:id', (req, res) => {
    let index =list.findIndex(item => item.id === req.params.id)
    let item=list[index]
    return res.json(item)
})


// app.put('/test', (req, res) => {
//     const item:FilerShow=req.body
//     const {search,filter,page,perPage}=item
    
//     let listShow:Product[]=list
//     if(search!==""){
//         listShow=list.filter(item=>item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
//     }
//     if(filter!==""){
//         let listSort=listShow
//         if(filter==="AZ"){
//             listShow= listSort.sort((a, b) => (a.name.toLowerCase()>b.name.toLowerCase()) ? 1 : -1)
//         }else if(filter==="ZA"){
//             listShow=listSort.sort((a, b) => (a.name.toLowerCase()<b.name.toLowerCase()) ? 1 : -1)
//         }else if(filter==="Ascend"){
//             listShow=listSort.sort((a, b) => (a.price > b.price) ? 1 : -1)
//         }else if(filter==="Descend"){
//             listShow=listSort.sort((a, b) => (a.price < b.price) ? 1 : -1)
//         }else{
//             listShow=list
//         }
//     }
    
    
//     let totalPage = Math.ceil(listShow.length / perPage)
//     const start = ((page-1) * perPage)
//     const end = start + perPage;

//     let obj={
//         products:listShow.slice(start, end),
//         totalPage:totalPage
//     }
    
//     return res.json(obj)
// });

// app.post('/order/add', (req, res) => {
// //     const item:OrderTest=req.body
// //     listOrder.push(item)
// //     return res.json(listOrder)
// // })

// app.get('/order/list', (req, res) => {
//     return res.json(listOrder)
// })

const port= 3333

app.listen(port, () => {
    console.log('The application is listening on port:'+ port );
})
