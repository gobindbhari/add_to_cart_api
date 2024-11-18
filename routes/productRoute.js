import express from 'express'
import { createProduct } from '../controllers/productController.js'
import { upload } from '../middlewares/multer.js'

const productRouter = express.Router()

productRouter.route('/create').post(upload.single('image') , createProduct)

export {productRouter}