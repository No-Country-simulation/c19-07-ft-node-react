import { z } from "zod";

export const createAcAreaFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(15, "Description must be at least 15 characters long")
    .max(50, "Description must be at most 50 characters long"),
  educational_level: z.string().refine((value) => {
    return ["PRIMARY", "SECONDARY"].includes(value);
  }, "Please select an educational level"),
});

export const editAcAreaFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(15, "Description must be at least 15 characters long")
    .max(50, "Description must be at most 50 characters long"),
  educational_level: z.string().refine((value) => {
    return ["PRIMARY", "SECONDARY"].includes(value);
  }, "Please select an educational level"),
});

export type CreateAcAreaFormData = z.infer<typeof createAcAreaFormSchema>;
export type EditAcAreaFormData = z.infer<typeof editAcAreaFormSchema>;
