import {Router} from 'express'
import verifyToken from '../auth/auth';
import authToken from '../auth/auth';
import { cartController} from '../controller/CartController';
import { orderController } from '../controller/OrderController';
import { productController} from '../controller/ProductController';
import { userController } from '../controller/UserController';
const router = Router();


router.put('/login',userController.check)
router.put('/getMe',verifyToken,userController.getMe)

//product router
router.put('/products',productController.list)
router.put('/products/add',verifyToken,productController.add)
router.put('/products/update',verifyToken,productController.update)
router.get('/products/delete/:id',verifyToken,productController.delete)
router.get('/product/detail/:id',productController.get)

//order router
router.put('/order/update',orderController.update)
router.put('/order/list',verifyToken,orderController.list)

//user router
router.put('/user',verifyToken,orderController.get)
router.put('/user/getInfo',verifyToken,userController.get)

//Cart router
router.put('/cart',verifyToken,cartController.getCarts)
router.put('/cart/add',verifyToken,cartController.create)
router.put('/cart/delete',verifyToken,cartController.delete)
router.put('/cart/update',verifyToken,cartController.update)

export default router;