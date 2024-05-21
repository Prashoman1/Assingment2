import express  from "express";
import { ProductController } from "./product.controller";


const route = express.Router();

route.post('/products', ProductController.createAnProduct);
route.get('/products', ProductController.getAllProduct);
route.get('/products/:productId', ProductController.getProductById);
route.put('/products/:productId', ProductController.updateProduct);
route.delete('/products/:productId', ProductController.deleteProduct);


export const productRouter = route;