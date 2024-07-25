import z from 'zod'

export const typeUserSchemaOptional = z
  .string()
  .transform((value) => {
    return value.toUpperCase()
  })
  .refine(
    (value) =>
      value === 'ADMIN' ||
      value === 'PARENTS' ||
      value === 'STUDENT' ||
      value === 'PROFESSOR'
  ).optional()
export type TypeUserSchemaOptional = z.infer<typeof typeUserSchemaOptional>

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  typeUser: z.enum(['ADMIN', 'PARENTS', 'STUDENT', 'PROFESSOR'])
})
export type CreateUserSchema = z.infer<typeof createUserSchema>
