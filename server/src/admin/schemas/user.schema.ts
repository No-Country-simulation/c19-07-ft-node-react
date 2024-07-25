import z from 'zod'

export const queryNameSchema = z.string().optional()
export type QueryNameSchema = z.infer<typeof queryNameSchema>

export const typeUserSchemaOptional = z
  .string()
  .transform((value) => {
    if (value === '') return undefined
    return value.toUpperCase()
  })
  .refine(
    (value) =>
      value === 'ADMIN' ||
      value === 'PARENTS' ||
      value === 'STUDENT' ||
      value === 'PROFESSOR' ||
      value === undefined
  ).optional()
export type TypeUserSchemaOptional = z.infer<typeof typeUserSchemaOptional>

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  typeUser: z.enum(['ADMIN', 'PARENTS', 'STUDENT', 'PROFESSOR'])
})
export type CreateUserSchema = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Invalid email' }),
  typeUser: z.enum(['ADMIN', 'PARENTS', 'STUDENT', 'PROFESSOR'])
})
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
