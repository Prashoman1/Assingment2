import { z } from 'zod';


const variantValidationSchema = z.object({
    type: z.string({
      required_error: "Variant type is required.",
    }),
    value: z.string({
      required_error: "Variant value is required.",
    }),
  });

  // using the Zod validation schema in the Product 
export const productValidationSchema = z.object({
    name: z.string({
      required_error: "Name is required.",
    }).min(1, "Name cannot be empty."),

    description: z.string({
      required_error: "Description is required.",
    }).min(1, "Description cannot be empty."),

    price: z.number({
      required_error: "Price is required.",
    }).positive("Price must be a positive number."),

    category: z.string({
      required_error: "Category is required.",
    }).min(1, "Category cannot be empty."),

    tags: z.array(z.string(), {
      required_error: "Tags are required.",
    }).min(1, "There must be at least one tag."),

    variants: z.array( variantValidationSchema , {
      required_error: "Variants are required.",
    }),

    inventory: z.object({
      quantity: z.number({
        required_error: "Quantity is required.",
      }).positive("Quantity must be greater than zero.").nonnegative("Quantity cannot be negative."),

      inStock: z.boolean({
        required_error: "InStock status is required.",
      })}, 
    {
      required_error: "Inventory is required.",
    }),
  });

  
