import z from 'zod'
export const typeUserSchema = z
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
  ).optional() // Transformar a mayúsculas
export type TypeUser = z.infer<typeof typeUserSchema>
