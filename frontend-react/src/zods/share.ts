import { z } from "zod";

const phoneRegex = new RegExp(/^[0-9+]{1,}[0-9-]{3,15}$/);

export const authShareSchema = z.object({
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
});