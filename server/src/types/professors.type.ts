import { Courses, Students, Users } from '@prisma/client'
export interface CreateProfessor {
  academicAreaId: string
  hireDate: Date
  educationalLevelId: string
  employeeState: string
  userId: string
}
export interface CreateAcademicRecord {
  curso_id: string
  name: string
  description: string
  date: string
  student_id: string
  mark: number
  comment: string
}
export interface StudentsAndCourse {
  course: Courses
  students: StudentsWithData[]
}
export interface StudentsWithData extends Students, Partial<Pick<Users, 'name'>> {
}
