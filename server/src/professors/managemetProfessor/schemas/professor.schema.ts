import z from 'zod'
export const createEvaluationSchema = z.object({
  cursoId: z.string(),
  name: z.string(),
  description: z.string(),
  periodo: z.enum(['PRIMER_PERIODO', 'SEGUNDO_PERIODO', 'TERCER_PERIODO', 'CUARTO_PERIODO'])
})
export type CreateEvaluationSchema = z.infer<typeof createEvaluationSchema>

export const createEvaluationResultSchema = z.object({
  evaluationId: z.string(),
  studentId: z.string(),
  mark: z.number().min(1).max(100),
  comment: z.string()
})
export type CreateEvaluationResultSchema = z.infer<typeof createEvaluationResultSchema>

export const getEvaluationsByPeriodoOfStudentSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  periodo: z.enum(['PRIMER_PERIODO', 'SEGUNDO_PERIODO', 'TERCER_PERIODO', 'CUARTO_PERIODO'])
})
export type GetEvaluationsByPeriodoOfStudentSchema = z.infer<typeof getEvaluationsByPeriodoOfStudentSchema>
