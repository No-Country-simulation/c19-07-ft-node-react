import { PrismaClient, Students } from '@prisma/client'

import { IStudenRepository } from './interface/student.interface'
import { IEvaluationsAndEvaluationsResults, IStudentsWitchCourses } from '../interface/student.interface'
import { GetEvaluationsByPeriodoOfStudentSchema } from '../schemas/student.schema'

export class StudentRepository implements IStudenRepository {
  constructor (private readonly prisma: PrismaClient) {}
  async getEvaluationsByPeriodoOfStudent (data: GetEvaluationsByPeriodoOfStudentSchema): Promise<IEvaluationsAndEvaluationsResults[]> {
    const evaluations = await this.prisma.evaluations.findMany({
      where: {
        periodo: data.periodo,
        curso_id: data.courseId
      },
      include: {
        curso: true,
        evaluation_result: {
          where: {
            student_id: data.studentId
          }
        }
      }
    })
    return evaluations
  }

  async getStudenByStudentId (studentId: string): Promise<Students | null> {
    const student = await this.prisma.students.findUnique({
      where: {
        student_id: studentId
      }
    })
    return student
  }

  async getCoursesOfStudent (studentId: string): Promise<IStudentsWitchCourses | null> {
    const courses = await this.prisma.students.findUnique({
      where: {
        student_id: studentId
      },
      include: {
        courses: true
      }
    })

    return courses
  }
}
