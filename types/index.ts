import { z } from 'zod';
import { productSchema, insertCartSchema, cartItemSchema } from '../lib/validators';

export type Product = z.infer<typeof productSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
