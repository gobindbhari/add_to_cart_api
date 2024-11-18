import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    cartCount:{
        type:Number,
        default:0
    },
    cart: [{
        productId:{type:mongoose.Schema.Types.ObjectId , ref:'products'},
        quantity:{ type:Number, default:1, min:1 },
        price: Number
    }],
    toatalCartPrice:{
        type:Number,
        default:0
    }
})

export const userModel = mongoose.model('user', userSchema)