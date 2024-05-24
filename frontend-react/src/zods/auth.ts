
import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required!").trim(),
    email: z
        .string()
        .min(1, "Email is required!")
        .email("Invalid email address!")
        .trim(),
    password: z.string().min(6, "Password must be at least 6 characters!").trim(),
});
export const loginSchema = registerSchema.omit({ name: true });
export const forgotPasswordSchema = loginSchema.pick({ email: true });

export type FormRegisterFields = z.infer<typeof registerSchema>;
export type FormLoginFields = z.infer<typeof loginSchema>;
export type FormForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;