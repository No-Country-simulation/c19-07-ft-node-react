import { Users } from '@prisma/client'
import z from 'zod'
export const typeUserSchema = z.string()
  .transform(value => value.toUpperCase() as Users['type_user']).refine(value => value === 'ADMIN' || value === 'PARENTS' || value === 'STUDENT' || value === 'PROFESSOR') // Transformar a mayúsculas
export type TypeUser = z.infer<typeof typeUserSchema>
