import z from 'zod'

export const academicAreaIdSchema = z.string().cuid()
export type AcademicAreaId = z.infer<typeof academicAreaIdSchema>

export const createAcademicAreaSchema = z.object({
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
export type CreateAcademicAreaSchema = z.infer<typeof createAcademicAreaSchema>

export const updateAcademicAreaSchema =
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
export type UpdateAcademicAreaSchema = z.infer<typeof updateAcademicAreaSchema>
