import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { OrderValidation } from "./order.validation";
import { ProductService } from "../product/product.service";


// createOrder medthod with quantity validation
const createOrder= async (req: Request, res: Response) => {
    try {
        const order = req.body;
        const orderValidation= OrderValidation.parse(order);

        // fetch data by productId
        const product = await ProductService.getProductById_DB(orderValidation.productId);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product not found"
            });
        }

        // check quantity available in inventory
        if(product.inventory.quantity < orderValidation.quantity){
            return res.status(400).json({
                success:false,
                message:"Insufficient quantity available in inventory"
            });
        }

        const quantityProduct =  product.inventory.quantity - orderValidation.quantity;

        // check product quantity and set inStock false if quantity is less than equal 0
        if(quantityProduct<=0){
            product.inventory.inStock = false;
        }
        product.inventory.quantity = quantityProduct;
        await product.save();

        const result = await OrderService.orderCreate_DB(orderValidation);
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Order not created"
              
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order created successfully!",
            date: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Order Not Created! Internal Server Error!",
            error: error
        });
    }

}

const getAllOreder = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;
        // fetch all orders by email query
        if(email){
            const result = await OrderService.orderGetAllByEmail_DB(email);
            if(!result){
                return res.status(400).json({
                    success:false,
                    message:"Order Not Found"
                });
            }
            return res.status(200).json({
                success:true,
                message:"Orders fetched successfully!",
                data:result
            });
        }

        const result = await OrderService.orderGetAll_DB();
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Order Not Found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Orders fetched successfully!",
            data:result
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Order Not Found! Internal Server Error!",
            error:error
        });
    }
}



export const OrderController = {
    createOrder,
    getAllOreder
}