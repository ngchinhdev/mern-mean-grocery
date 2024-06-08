import { z } from 'zod';

const phoneRegex = new RegExp(/^[0-9+]{1,}[0-9-]{3,15}$/);
const zipCodeRegex = new RegExp(/^\d{5}(-\d{4})?$|^\d{6}$/);

export const checkoutSchema = z.object({
    firstName: z.string().min(1, "First name is required").trim(),
    lastName: z.string().min(1, "Last name is required").trim(),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .trim(),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .trim()
        .regex(phoneRegex, "Invalid phone number"),
    street: z.string().min(1, "Street address is required").trim(),
    city: z.string().min(1, "City is required").trim(),
    country: z.string().min(1, "Country is required").trim(),
    zipCode: z.string()
        .min(1, "Zip code is required")
        .trim()
        .regex(zipCodeRegex, "Invalid zip code"),
});