import { IStudentsWitchEvaluations } from '../../interface/dashboardInterface'

export interface IdashboardRepository {
  getStudentsWithEvaluations: () => Promise<IStudentsWitchEvaluations[]>
}
