import { IStudentsWitchEvaluations } from '../../interface/dashboardInterface'

export interface IdashboardRepository {
  getStudentsWithEvaluations: () => Promise<IStudentsWitchEvaluations[]>
  countActiveStudents: () => Promise<number>
  countTeachers: () => Promise<number>
  countAllUsers: () => Promise<number>
}
