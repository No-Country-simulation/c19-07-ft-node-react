import z from 'zod'
import { Academic_areas } from '@prisma/client'

export const academicAreaIdSchema = z.string().cuid()
export type AcademicAreaId = z.infer<typeof academicAreaIdSchema>

export const academicAreaSchema: z.ZodType<
Omit<Academic_areas, 'academic_area_id' | 'createdAt' | 'updatedAt'>
> = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .transform((name) => name.toUpperCase()),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long' }),
  educational_level: z
    .string()
    .min(3, { message: 'Educational level must be at least 3 characters long' })
    .transform((level) => level.toUpperCase())
})
export type AcademicArea = z.infer<typeof academicAreaSchema>

export const academicAreaPathSchema: z.ZodType<Partial<Academic_areas>> =
  z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .optional(),
    description: z
      .string()
      .min(3, { message: 'Description must be at least 3 characters long' })
      .optional(),
    educational_level: z
      .string()
      .min(3, {
        message: 'Educational level must be at least 3 characters long'
      })
      .optional()
  })
export type AcademicAreaPath = z.infer<typeof academicAreaPathSchema>
