import {Router} from 'express'
import { addProduct, deleteProduct, getListProduct, shopPagination, updateProduct } from '../controller/ProductController';
const router = Router();



router.get('/products', getListProduct)
router.put('/products/add',addProduct)
router.put('/products/update',updateProduct)
router.get('/products/delete/:id',deleteProduct)
router.put('/pagi',shopPagination)


export default router;