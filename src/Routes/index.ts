import {Router} from 'express'
import { handleAddProductToCart, handleDeleteProductFromCart, handleGetOrderList, handleGetOrderListWithPagination, handleGetProductFromCart, handleGetTotalFromCart, handleUpdateQuantityProductFromCart} from '../controller/CartController';
import { handleAddOrder, handleGetUserOrderInfo } from '../controller/OrderController';
import { handleAddProduct, handleDeleteProduct, handleGetListProduct, handleGetProductDetail, handleUpdateProduct, showShopPagination } from '../controller/ProductController';
import { handleGetUserInfo } from '../controller/UserController';
const router = Router();




router.get('/products', handleGetListProduct)
router.put('/products/add',handleAddProduct)
router.put('/products/update',handleUpdateProduct)
router.get('/products/delete/:id',handleDeleteProduct)
router.put('/pagi',showShopPagination)
router.get('/product/detail/:id',handleGetProductDetail)


router.post('/order/add',handleAddOrder)
router.put('/order/get',handleGetOrderList)
router.put('/order/getWithPagination',handleGetOrderListWithPagination)

router.put('/user',handleGetUserOrderInfo)
router.put('/user/getInfo',handleGetUserInfo)

router.put('/cart',handleGetProductFromCart)
router.put('/cart/add',handleAddProductToCart)
router.put('/cart/delete',handleDeleteProductFromCart)
router.put('/cart/total',handleGetTotalFromCart)
router.put('/cart/update',handleUpdateQuantityProductFromCart)

export default router;