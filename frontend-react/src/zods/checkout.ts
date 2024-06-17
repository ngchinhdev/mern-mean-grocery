import { z } from 'zod';
import { authShareSchema } from './share';

const zipCodeRegex = new RegExp(/^\d{5}(-\d{4})?$|^\d{6}$/);

export const checkoutFormSchema = authShareSchema.extend({
    firstName: z.string().min(1, "First name is required").trim(),
    lastName: z.string().min(1, "Last name is required").trim(),
    address: z.string().min(1, "Street address is required").trim(),
    city: z.string().min(1, "City is required").trim(),
    country: z.string().min(1, "Country is required").trim(),
    zipCode: z.string()
        .min(1, "Zip code is required")
        .trim()
        .regex(zipCodeRegex, "Invalid zip code"),
});