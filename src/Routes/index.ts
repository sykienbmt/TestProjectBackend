import {Router} from 'express'
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


export default router;