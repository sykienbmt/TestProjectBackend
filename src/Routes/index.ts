import {Router} from 'express'
import { addOrder, addProduct, deleteProduct, getListProduct, getOrderList, shopPagination, updateProduct } from '../controller/ProductController';
const router = Router();




router.get('/products', getListProduct)
router.put('/products/add',addProduct)
router.put('/products/update',updateProduct)
router.get('/products/delete/:id',deleteProduct)
router.put('/pagi',shopPagination)



router.post('/order/add',addOrder)
router.get('/order/get',getOrderList)


export default router;