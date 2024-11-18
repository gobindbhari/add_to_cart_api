import mongoose from "mongoose";

const product = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    image:{
        type :String
    },
    price:{
        type:Number,
        required: true
    }

})

export const productModel = mongoose.model('products', product)