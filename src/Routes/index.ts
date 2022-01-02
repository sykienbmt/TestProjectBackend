import {Router} from 'express'
import { addProductToCart, deleteProductFromCart, getProductFromCart, getTotalFromCart, getUserInfo, getUserOrderInfo, updateQuantity } from '../controller/CartController';
import { addOrder, addProduct, deleteProduct, getListProduct, getOrderList, getProductDetail, shopPagination, updateProduct } from '../controller/ProductController';
const router = Router();




router.get('/products', getListProduct)
router.put('/products/add',addProduct)
router.put('/products/update',updateProduct)
router.get('/products/delete/:id',deleteProduct)
router.put('/pagi',shopPagination)
router.get('/product/detail/:id',getProductDetail)


router.post('/order/add',addOrder)
router.get('/order/get',getOrderList)

router.put('/user',getUserOrderInfo)
router.put('/user/getInfo',getUserInfo)

router.put('/cart',getProductFromCart)
router.put('/cart/add',addProductToCart)
router.put('/cart/delete',deleteProductFromCart)
router.put('/cart/total',getTotalFromCart)
router.put('/cart/update',updateQuantity)

export default router;