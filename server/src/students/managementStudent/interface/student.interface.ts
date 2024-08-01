import { Evaluations, Evaluation_results, Courses, Students, Users } from '@prisma/client'

export interface IEvaluationsAndEvaluationsResults extends Evaluations {
  curso: Courses
  evaluation_result: Evaluation_results[]
}

export interface IStudentsWitchCourses extends Students {
  courses: Courses[]
}

export interface IStudentsWitchUser extends Students {
  user: Users
}

export interface IEvaluationResultsWitchEvaluationAndCourse extends Evaluation_results {
  evaluation: IEvaluationsWitchCourse
}

export interface IEvaluationsWitchCourse extends Evaluations {
  curso: Courses
}
