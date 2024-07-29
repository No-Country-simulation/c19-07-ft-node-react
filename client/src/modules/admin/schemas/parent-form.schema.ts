import { z } from "zod";

export const createParentFormSchema = z.object({
  user_id: z.string().min(1, "User is required"),
  relation: z.string().refine((value) => {
    return ["MOTHER", "FATHER", "OTHER"].includes(value);
  }, "Please select a kinship"),
});

export const editParentFormSchema = z.object({
  relation: z.string().refine((value) => {
    return ["MOTHER", "FATHER", "OTHER"].includes(value);
  }, "Please select a kinship"),
});

export type CreateParentFormData = z.infer<typeof createParentFormSchema>;
export type EditParentFormData = z.infer<typeof editParentFormSchema>;
