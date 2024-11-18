import { userModel } from "../models/userModel.js";
import { productModel } from "../models/productModel.js";

const addCart = async (req, res) => {
    try {
        const { userid, productid } = req.params
        if (!userid || !productid) {
            return res.status(400).json({ message: 'Please provide userId and ProductId' })
        }
        const userExist = await userModel.findById(userid)
        const productExist = await productModel.findById(productid)
        console.log(userExist, '>>>>>>>>>>>>')
        //  console.log(productExist,'>>>>>>>>>>>>>>')
        if (!userExist) {
            return res.status(400).json({ message: 'User not found' })
        }
        if (!productExist) {
            return res.status(400).json({ message: 'Product not found' })
        }
        const isCart = userExist.cart.findIndex(e => e.productId == productid)
        if(isCart != -1 && userExist.cart[isCart].quantity >= 1 ){
            userExist.cart[isCart].quantity += 1
        }else{
            const { price } = productExist
        const data = {
            productId: productid,
            price: price
        }
        userExist.cart.push(data)
        userExist.cartCount += 1
        }
        
        await userExist.save()

        const totalcart = userExist.cart.reduce((d,e) => {
            console.log(e,'eeeeeeeeeeeeeeeeeeeeeeeeeeee')
            console.log(e.price,e.quantity,'--------------->>>>>>>>>')
            return d + ( e.price * e.quantity )
        },0);
        console.log( totalcart, 'totalcart ======ghjjhgjhgjhgjhg>>>>>>>' )
        userExist.toatalCartPrice = totalcart

        await userExist.save()
        return res.status(200).json({ message: 'Product is successfuly added to cart' })
    } catch (error) {
        console.log('Product is not added to cart')
        return res.status(400).json({ message: 'Product is not added to cart' })
    }
}

const deleteFromCart = async (req,res) => {
        try {
            const { userid, cartid } = req.params
            if (!userid || !cartid) {
                return res.status(400).json({ message: 'Please provide userId and cartid' })
            }
            const userExist = await userModel.findById(userid)
            console.log(userExist, '>>>>>>>>>>>>')
            //  console.log(productExist,'>>>>>>>>>>>>>>')
            if (!userExist) {
                return res.status(400).json({ message: 'User not found' })
            }
            const cartExist = userExist.cart.findIndex(e => e._id == cartid)
            console.log(cartExist)
            if (cartExist == -1 ) {
                return res.status(400).json({ message: 'Cart not found' })
            }
            const cartdata = userExist.cart[cartExist]
            console.log(cartdata,'cartdataaaaaaaaaaaaaaaaaaaaa=======>>>>')
            if(cartdata.quantity > 1){
                userExist.cart[cartExist].quantity -= 1
                await userExist.save()
            }else{
                userExist.cart.splice(cartExist,1)
                userExist.cartCount -= 1
                await userExist.save()
            }
            console.log('ghghhgfjgfjggfdjgfdhghdxhgfxdhggfcxcxvcxchfffcxhggffx')
            const totalcart = userExist.cart.reduce((d,e) => {
                console.log(e,'eeeeeeeeeeeeeeeeeeeeeeeeeeee')
                console.log(e.price ,e.quantity,'--------------->>>>>>>>>')
                return d + ( e.price * e.quantity )
            },0);
            console.log( totalcart, 'totalcart ======ghjjhgjhgjhgjhg>>>>>>>' )
            userExist.toatalCartPrice = totalcart
    
            await userExist.save()
            return res.status(200).json({ message: 'Product is successfuly deleted from cart' })
        } catch (error) {
            console.log('Product is not deleted from cart')
            return res.status(400).json({ message: 'Product is not deleted from cart' })
        }
    }

export { addCart , deleteFromCart}