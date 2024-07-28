import { Evaluation_results, Students, Users } from '@prisma/client'

export interface IStudentsWitchEvaluations extends Students {
  evaluations_results: Evaluation_results[]
  user: Users
}
