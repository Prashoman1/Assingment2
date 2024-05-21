import { TProduct } from "./product.interface";
import { Product } from "./product.model";


// create product
const createProduct_DB = async(product:TProduct)=>{
    const result = await Product.create(product);
    return result;
}

// get all product
const getAllProduct_DB = async()=>{
    const result = await Product.find();
    return result;
}


// get prduct by id
const getProductById_DB = async(productId:string)=>{
    const result = await Product.findById(productId);
    return result;

}

// update Product by id
const updateProductById_DB = async(productId:string,product:TProduct)=>{
    const result = await Product.updateOne({
        _id:productId
    },product);
    return result;
}

// delete product by id
const deleteProductById_DB = async(productId:string)=>{
    const result = await Product.deleteOne({_id:productId});
    return result;
}


// search product using the queary parmitter search
const searchProduct_DB = async(search:string)=>{
    const result = await Product.find({
        $or:[
            {name:{$regex:search,$options:'i'}},
            {description:{$regex:search,$options:'i'}},
            {category:{$regex:search,$options:'i'}},
            {tags:{$regex:search,$options:'i'}},
            {variants:{$elemMatch:{type:{$regex:search,$options:'i'}}}},
        ]
    });
    return result;
}

export const ProductService ={
    createProduct_DB,
    getAllProduct_DB,
    getProductById_DB,
    updateProductById_DB,
    deleteProductById_DB,
    searchProduct_DB
}