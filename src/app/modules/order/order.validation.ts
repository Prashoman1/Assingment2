import { z } from "zod";



export const OrderValidation = z.object({
    email: z.string({
        required_error: "Email is required."
    }).email("Invalid email address."),
    productId: z.string({
        required_error: "Product ID is required."
    }),
    price: z.number({
        required_error: "Price is required."
    }).positive("Price must be a positive number."),
    quantity: z.number({
        required_error: "Quantity is required."
    }).positive("Quantity must be a positive number.")
})