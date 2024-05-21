import express  from "express";
import { OrderController } from "./order.controller";



const route = express.Router();

route.post('/orders', OrderController.createOrder);

route.get('/orders', OrderController.getAllOreder);


export const OrderRoute = route;