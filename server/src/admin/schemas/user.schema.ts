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

export type TypeUser = z.infer<typeof typeUserSchema>
