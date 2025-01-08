import { Schema , model , models } from "mongoose";

const productSchema = new Schema({
    productName:{
        type:String,
        require:true,
    },
    productPrice:{
        type:String,
        require:true,
    },
    productSize:{
        type:String,
        require:true,
    },
    productMaterial:{
        type:String,
        require:true,
    },
    productDesc:{
        type:String,
        require:true,
    },
    productImage:{
        type:String,
        require:true,
    },
    productColor:{
        type:String,
        require:true,
    },
    productWeight:{
        type:Number,
        require:true,
    },
    productBrand:{
        type:String,
        require:true,
    },
})

const Product = models.Product || model('Product' , productSchema)

export default Product;