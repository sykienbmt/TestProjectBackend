import express, {Request, Response} from 'express'
import { FilerShow } from './modal/FilerShow'
import { orders, OrderTest } from './modal/OrderTest'
import { Product ,listIphone } from './modal/Product'
var cors = require('cors')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

//TestGitSSH

let list:Product[]=listIphone
let listOrder:OrderTest[]=orders

// let item:OrderTest={buyerId:"Starr",orderId:'123123123',name:'KienNguyen',address:"bmt",phone:"0946761639",time:1640700880841,[]}

app.get('/products', (req, res) => {
    res.json(list)
})

app.get('/products/delete/:id', (req, res) => {
    list=list.filter(item=>item.id!==req.params.id)
    return res.json(list)
})

app.put('/products/add', (req, res) => {
    list.push(req.body)
    return res.json(list)
})

app.put('/products/update', (req, res) => {
    let index =list.findIndex(item => item.id === req.body.id)
    list[index]=req.body
    return res.json(list)
})


app.get('/product/detail/:id', (req, res) => {
    let index =list.findIndex(item => item.id === req.params.id)
    let item=list[index]
    return res.json(item)
})


app.put('/test', (req, res) => {
    const item:FilerShow=req.body
    const {search,filter,page,perPage}=item
    
    let listShow:Product[]=list
    if(search!==""){
        listShow=list.filter(item=>item.name.includes(search))
    }
    if(filter!==""){
        let listSort=listShow
        if(filter==="AZ"){
            listShow= listSort.sort((a, b) => (a.name.toLowerCase()>b.name.toLowerCase()) ? 1 : -1)
        }else if(filter==="ZA"){
            listShow=listSort.sort((a, b) => (a.name.toLowerCase()<b.name.toLowerCase()) ? 1 : -1)
        }else if(filter==="Ascend"){
            listShow=listSort.sort((a, b) => (a.price > b.price) ? 1 : -1)
        }else if(filter==="Descend"){
            listShow=listSort.sort((a, b) => (a.price < b.price) ? 1 : -1)
        }else{
            listShow=list
        }
    }
    
    
    let totalPage = Math.ceil(listShow.length / perPage)
    const start = ((page-1) * perPage)
    const end = start + perPage;

    let obj={
        products:listShow.slice(start, end),
        totalPage:totalPage
    }
    
    return res.json(obj)
});

app.post('/order/add', (req, res) => {
    const item:OrderTest=req.body
    listOrder.push(item)
    return res.json(listOrder)
})

app.get('/order/list', (req, res) => {
    return res.json(listOrder)
})

const port= 3333

app.listen(port, () => {
    console.log('The application is listening on port:'+ port );
})
