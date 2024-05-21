import { Schema, model, connect } from 'mongoose';
import { TProduct, TVariant } from './product.interface';


// variant schema
const variantSchema = new Schema<TVariant>({
    type: { type: String, required: true },
    value: { type: String, required: true }
  });


// product schema
const productSchema = new Schema<TProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [variantSchema], required: true },
    inventory: {
        quantity: { type: Number, required: true },
        inStock: { type: Boolean, required: true }
    }
  });
  
  // 3. Create a Product Model.
export  const Product = model<TProduct>('Product', productSchema)