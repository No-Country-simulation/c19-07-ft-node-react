import { Courses, Evaluation_results, Evaluations } from '@prisma/client'
import { CreateEvaluationResultSchema, CreateEvaluationSchema } from '../../schemas/professor.schema'
import { IEvaluationsAndEvaluationsResults } from '../../interface/professor.interface'

export interface IProfessorRepository {
  createEvaluations: (data: CreateEvaluationSchema) => Promise<Evaluations>
  findCursoId: (id: string) => Promise<Courses | null>
  createEvaluationResult: (data: CreateEvaluationResultSchema) => Promise<Evaluation_results>
  getEvaluationsByPeriodoOfStudent: (periodo: Evaluations['periodo'], studentId: string, courseId: string) => Promise<IEvaluationsAndEvaluationsResults[]>
}
