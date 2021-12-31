import {Router} from 'express'
import { addProductToCart, getProductFromCart, getUserOrderInfo } from '../controller/CartController';

const routerCart = Router();

routerCart.put('/user',getUserOrderInfo)
routerCart.put('/cart',getProductFromCart)
routerCart.put('/cart/add',addProductToCart)

export default routerCart;