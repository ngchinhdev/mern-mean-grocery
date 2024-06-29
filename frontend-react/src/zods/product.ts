import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(1, "(*) Category name is required").trim(),
    description: z.string().min(1, "(*) Description is required").trim(),
    price: z.number().min(1, "(*) Price is required"),
    orgPrice: z.number().min(1, "(*) Origin price is required"),
    quantity: z.number().min(1, "(*) Origin price is required"),
    categoryId: z.string().min(1, "(*) Category is required").trim(),
    hot: z.string().min(1, "(*) Hot is required").trim(),
});