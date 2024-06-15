import { z } from "zod";

const emailValidation = z
    .string()
    // .min(1, "Email is required")
    .email("Invalid email address")
    .trim();

const phoneRegex = new RegExp(/^[0-9+]{1,}[0-9-]{3,15}$/);
const phoneValidation = z
    .string()
    // .min(1, "Phone number is required")
    .trim()
    .regex(phoneRegex, "Invalid phone number");

export const authShareSchema = z.object({
    email: emailValidation,
    phone: phoneValidation,
});

export const authShareSchemaOptional = z.object({
    email: emailValidation.optional(),
    phone: phoneValidation.optional(),
});
