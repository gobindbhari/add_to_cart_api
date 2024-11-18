import { productModel } from "../models/productModel.js";

const createProduct = async (req,res) => {
    try {
        const {name,description,price} = req.body
    // const Image = req.file
    console.log(name,description,price,'name,description,price ======>>>>>>')
    if(!name || !description ||!price || !req.file){
        return res.status(400).json({message : 'Provide all data fields'})
    }
    const imageUrl = req.file.path
    console.log(imageUrl)
    const acc = await productModel.create({
        name:name,
        description: description,
        price:price,
        image : imageUrl
    })
    console.log(acc)
    return res.status(201).json({ message :'Product is successfuly created'})
    } catch (error) {
        console.log('error in createProduct productController',error)
        return res.status(400).json({ message :'Product is not created please try again'})

    }
}

export {createProduct}