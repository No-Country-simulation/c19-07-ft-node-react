import { Courses, Students } from '@prisma/client'
export interface CreateProfessor {
  academicAreaId: string
  hireDate: Date
  educationalLevelId: string
  employeeState: string
  userId: string
}
export interface CreateEvaluationAndResults {
  curso_id: string
  name: string
  description: string
  date: Date
  student_id: string
  mark: number
  comment: string
}
export interface StudentsAndCourse {
  course: Courses
  students: Students[]
}
