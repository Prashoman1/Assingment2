"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string({
        required_error: "Variant type is required.",
    }),
    value: zod_1.z.string({
        required_error: "Variant value is required.",
    }),
});
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required.",
    }).min(1, "Name cannot be empty."),
    description: zod_1.z.string({
        required_error: "Description is required.",
    }).min(1, "Description cannot be empty."),
    price: zod_1.z.number({
        required_error: "Price is required.",
    }).positive("Price must be a positive number."),
    category: zod_1.z.string({
        required_error: "Category is required.",
    }).min(1, "Category cannot be empty."),
    tags: zod_1.z.array(zod_1.z.string(), {
        required_error: "Tags are required.",
    }).min(1, "There must be at least one tag."),
    variants: zod_1.z.array(variantValidationSchema, {
        required_error: "Variants are required.",
    }),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number({
            required_error: "Quantity is required.",
        }).int("Quantity must be an Positive Number.").nonnegative("Quantity cannot be negative."),
        inStock: zod_1.z.boolean({
            required_error: "InStock status is required.",
        })
    }, {
        required_error: "Inventory is required.",
    }),
});
