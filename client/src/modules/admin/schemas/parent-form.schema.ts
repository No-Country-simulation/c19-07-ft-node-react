import { z } from "zod";

export const createParentFormSchema = z.object({
  user_id: z.string({ message: "required" }).cuid("Invalid user id"),
  relation: z
    .string()
    .min(5, "Relation must be at least 5 characters")
    .max(25, "Relation must be at most 25 characters"),
});

export const editParentFormSchema = z.object({
  relation: z
    .string()
    .min(5, "Relation must be at least 5 characters")
    .max(25, "Relation must be at most 25 characters"),
});

export type CreateParentFormData = z.infer<typeof createParentFormSchema>;
export type EditParentFormData = z.infer<typeof editParentFormSchema>;
