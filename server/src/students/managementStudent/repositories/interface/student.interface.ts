import { Students } from '@prisma/client'

import { IEvaluationsAndEvaluationsResults, IStudentsWitchCourses } from '../../interface/student.interface'
import { GetEvaluationsByPeriodoOfStudentSchema } from '../../schemas/student.schema'

export interface IStudenRepository {
  getEvaluationsByPeriodoOfStudent: (data: GetEvaluationsByPeriodoOfStudentSchema) => Promise<IEvaluationsAndEvaluationsResults[]>
  getStudenByStudentId: (studentId: string) => Promise<Students | null>
  getCoursesOfStudent: (studentId: string) => Promise<IStudentsWitchCourses | null>
}
