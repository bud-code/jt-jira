import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().trim().min(5, "Password must be at least 5 characters"),
});
