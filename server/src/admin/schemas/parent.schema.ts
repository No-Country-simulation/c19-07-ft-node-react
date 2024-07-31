import z from 'zod'

export const queryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (isNaN(Number(val)) ? 1 : Number(val))),
  limit: z
    .string()
    .optional()
    .transform((val) => (isNaN(Number(val)) ? 10 : Number(val))),
  name: z.string().optional(),
  email: z.string().optional()
})
export type QueryParamsSchema = z.infer<typeof queryParamsSchema>

export const createParentSchema = z.object({
  userId: z.string(),
  relation: z.string().min(3)
})
export type CreateParentSchema = z.infer<typeof createParentSchema>

export const updateParentSchema = z.object({
  userId: z.string().optional(),
  relation: z.string().min(3).optional()
})
export type UpdateParentSchema = z.infer<typeof updateParentSchema>
