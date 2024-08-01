
import { IEvaluationsAndEvaluationsResults, IStudentsWitchCourses, IStudentsWitchUser } from '../../interface/student.interface'
import { GetEvaluationsByPeriodoOfStudentSchema } from '../../schemas/student.schema'

export interface IStudenRepository {
  getEvaluationsByPeriodoOfStudent: (data: GetEvaluationsByPeriodoOfStudentSchema) => Promise<IEvaluationsAndEvaluationsResults[]>
  getStudenByStudentId: (studentId: string) => Promise<IStudentsWitchUser | null>
  getCoursesOfStudent: (studentId: string) => Promise<IStudentsWitchCourses | null>
}
