import z from 'zod'

export const getEvaluationsByPeriodoOfStudentSchema = z.object({
  studentId: z.string(),
  courseId: z.string().optional(),
  periodo: z.enum(['PRIMER_PERIODO', 'SEGUNDO_PERIODO', 'TERCER_PERIODO', 'CUARTO_PERIODO']).optional()
})
export type GetEvaluationsByPeriodoOfStudentSchema = z.infer<typeof getEvaluationsByPeriodoOfStudentSchema>
