import z from 'zod'
export const queryPeriodoSchema = z.object({
  periodo: z.enum(['PRIMER_PERIODO', 'SEGUNDO_PERIODO', 'TERCER_PERIODO', 'CUARTO_PERIODO'])
})
export type QueryPeriodoSchema = z.infer<typeof queryPeriodoSchema>

export const queryStudentIdSchema = z.object({
  studentId: z.string({ message: 'parameter required' })
})
export type QueryStudenIdSchema = z.infer<typeof queryStudentIdSchema>

export const getEvaluationsByPeriodoOfStudentSchema = z.object({
  studentId: z.string(),
  courseId: z.string().optional(),
  periodo: z.enum(['PRIMER_PERIODO', 'SEGUNDO_PERIODO', 'TERCER_PERIODO', 'CUARTO_PERIODO']).optional()
})
export type GetEvaluationsByPeriodoOfStudentSchema = z.infer<typeof getEvaluationsByPeriodoOfStudentSchema>
