import { z } from "zod";

export const createUserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  typeUser: z.string().refine((value) => {
    return ["STUDENT", "PARENTS", "PROFESSOR", "ADMIN"].includes(value);
  }, "Please select a role"),
});

export const editUserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;
export type EditUserFormData = z.infer<typeof editUserFormSchema>;
