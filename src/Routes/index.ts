import {Router} from 'express'
import { cartController} from '../controller/CartController';
import { orderController } from '../controller/OrderController';
import { productController} from '../controller/ProductController';
import { userController } from '../controller/UserController';
const router = Router();


//product router
router.put('/products',productController.list)
router.put('/products/add',productController.add)
router.put('/products/update',productController.update)
router.get('/products/delete/:id',productController.delete)
router.get('/product/detail/:id',productController.get)

//order router
router.put('/order/add',orderController.update)
router.put('/order/list',orderController.list)

//user router
router.put('/user',orderController.getUserInfo)
router.put('/user/getInfo',userController.get)

//Cart router
router.put('/cart',cartController.getCarts)
router.put('/cart/add',cartController.create)
router.put('/cart/delete',cartController.delete)
router.put('/cart/update',cartController.update)

export default router;