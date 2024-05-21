import { Request, Response } from "express";
import { ProductService } from "./product.service";

import { productValidationSchema } from "./porduct.validation";



// createAnProduct medthod
const createAnProduct = async (req:Request,res:Response)=>{
    try {
        const product = req.body;
        // check validation of product data using zod validation schema
        const productValidationZodData = productValidationSchema.parse(product);
        const newProduct = await ProductService.createProduct_DB(productValidationZodData);
        if(!newProduct){
           return res.status(400).json({
            message:"Product not created",
            success:false
            });
        }
        return res.status(200).json({
            message:"Product created successfully!",
            success:true,
            data:newProduct
        });
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
            error:error
        });
    }
}

// get all product method
const getAllProduct = async (req:Request,res:Response)=>{
    try {

        const {searchTerm} = req.query;
        // its true is searchTerm query url
        if(searchTerm){
            const result = await ProductService.searchProduct_DB(searchTerm as string);
            if(!result){
                return res.status(400).json({
                    message:"No Product Found",
                    success:false
                });
            }
            return res.status(200).json({
                success:true,
                message:"Products fetched successfully!",
                data:result
            });
            
        }
        const result = await ProductService.getAllProduct_DB();
        if(!result){
            return res.status(400).json({
                message:"No Product Found",
                success:false
            });
        }
        return res.status(200).json({
            success:true,
            message:"Products fetched successfully!",
            data:result
        });
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
            error:error
        });
    }
}

// get single product method
const getProductById = async (req:Request,res:Response)=>{
    try {
        const {productId} = req.params;
        const result = await ProductService.getProductById_DB(productId);
        if(!result){
            return res.status(400).json({
                message:"No Product Found",
                success:false
            });
        }
        return res.status(200).json({
            success:true,
            message:"Product fetched successfully!",
            data:result
        });
        
    } catch (error) {
        
    }
}


const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const product = req.body;
        const productValidationZodData = productValidationSchema.parse(product);



        const updatedProduct = await ProductService.updateProductById_DB(productId, productValidationZodData);
        if (!updatedProduct) {
            return res.status(400).json({
                success: false,
                message: "Product cannot be updated",
            });
        }

        const result = await ProductService.getProductById_DB(productId);
        if (!result) {
            return res.status(400).json({
                message: "No Product Found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error,
        });
    }
};

// delete product method
const deleteProduct = async (req:Request,res:Response)=>{
    try {
        const {productId} = req.params;
        const result = await ProductService.deleteProductById_DB(productId);
        if(!result){
            return res.status(400).json({
                success:false,
                message:"No Product Found",
            });
        }
        const product = await ProductService.getProductById_DB(productId);
        if(!product){
            return res.status(200).json({
                success:true,
                message:"Product deleted successfully!",
                data : product
            });
            
        }
        return res.status(400).json({
            success:false,
            message:"No Product Found",
        });
       
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
            error:error
        });
    }
}

const searchProduct = async (req:Request,res:Response)=>{

    const {searchTerm} = req.query;
    console.log(searchTerm);
    return res.status(200).json({
        searchProduct:searchTerm
    })
    
}

export const ProductController ={
    createAnProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProduct
}