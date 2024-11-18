import express from 'express'
import { addCart, deleteFromCart } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.route('/add/:userid/:productid').post(addCart)
cartRouter.route('/delete/:userid/:cartid').post(deleteFromCart)

export {cartRouter}