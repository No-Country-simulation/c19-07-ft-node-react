import { Evaluations } from '@prisma/client'

import { IEvaluationsAndEvaluationsResults } from '../../interface/student.interface'

export interface IProfessorRepository {
  getEvaluationsByPeriodoOfStudent: (periodo: Evaluations['periodo'], studentId: string, courseId: string) => Promise<IEvaluationsAndEvaluationsResults[]>
}
