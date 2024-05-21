import { TOrder } from "./order.interface";
import { Order } from "./order.model";


// create order in database method
const orderCreate_DB = async (order: TOrder) => {
    const result = await Order.create(order);
    return result;
}

// get all order data method
const orderGetAll_DB = async () =>{
    const result = await Order.find();
    return result;
}

// get all orders by email method
const orderGetAllByEmail_DB = async (email: string) => {
    const result = await Order.find({email});
    return result;
}


export const OrderService = {
    orderCreate_DB,
    orderGetAll_DB,
    orderGetAllByEmail_DB
}