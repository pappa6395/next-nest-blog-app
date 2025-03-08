
import { z } from "zod";

export const SignUpFormSchema = z.object({
    name: z.string().min(2, { message : "Name must contain at least 2 character(s)" }).trim().max(50),
    email: z.string().email({ message: "Invalid email address"}),
    password: z.string().min(8)
    .regex(/[a-zA-Z]/, {message: "Contain at least one letter."})
    .regex(/[0-9]/, {message: "Contain at least one number."})
    .regex(/[^a-zA-Z0-9]/, {message: "Contain at least one special character."})
    .trim()
    .max(50),
})