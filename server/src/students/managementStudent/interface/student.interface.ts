import { Evaluations, Evaluation_results } from '@prisma/client'

export interface IEvaluationsAndEvaluationsResults extends Evaluations {
  evaluation_result: Evaluation_results[]
}
