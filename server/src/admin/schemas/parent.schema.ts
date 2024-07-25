import z from 'zod'

export const createParentSchema = z.object({
  userId: z.string(),
  relation: z.string().min(3)
})
export type CreateParentSchema = z.infer<typeof createParentSchema>
