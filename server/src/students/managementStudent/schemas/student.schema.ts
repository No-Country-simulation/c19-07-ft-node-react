import z from 'zod'

export const getEvaluationsByPeriodoOfStudentSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  periodo: z.enum(['PRIMER_PERIODO', 'SEGUNDO_PERIODO', 'TERCER_PERIODO', 'CUARTO_PERIODO'])
})
export type GetEvaluationsByPeriodoOfStudentSchema = z.infer<typeof getEvaluationsByPeriodoOfStudentSchema>
