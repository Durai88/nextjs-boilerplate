import { z } from "zod";

export const userOtpSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be exactly 10 digits")
    .regex(/^[0-9]{10}$/, "Only digits allowed"),
});

export type UserInput = z.infer<typeof userOtpSchema>;
