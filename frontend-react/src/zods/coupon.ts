import { z } from 'zod';

export const createCouponSchema = z.object({
    code: z.string().min(1, "(*) Coupon code is required").trim(),
    discount: z.number().min(1, "(*) Discount is required"),
    startTime: z.string().min(1, "(*) Start time is required").trim(),
    endTime: z.string().min(1, "(*) End time is required").trim(),
});