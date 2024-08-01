import { Evaluations, Evaluation_results, Courses, Students } from '@prisma/client'

export interface IEvaluationsAndEvaluationsResults extends Evaluations {
  curso: Courses
  evaluation_result: Evaluation_results[]
}

export interface IStudentsWitchCourses extends Students {
  courses: Courses[]
}
