const { Pool, Client} = require("pg");

import express, {Request, Response} from 'express'
import router from './Routes';
var cors = require('cors')


const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

app.use(router)



const port= 3333

app.listen(port, () => {
    console.log('The application is listening on port:'+ port );
})
