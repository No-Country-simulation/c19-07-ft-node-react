import { Evaluations } from '@prisma/client'
import { StudentRepository } from './repositories/student.repository'
import { ConflictError } from '../../errors/conflictError'
import HTTP_STATUS from '../../constants/statusCodeServer.const'
import { GetEvaluationsByPeriodoOfStudentSchema } from './schemas/student.schema'

export class StudentService {
  constructor (private readonly studentRepository: StudentRepository) {}

  async getEvaluationsByPeriodoOfStudent (data: GetEvaluationsByPeriodoOfStudentSchema): Promise<Evaluations[]> {
    const evaluations = await this.studentRepository.getEvaluationsByPeriodoOfStudent(data)
    if (evaluations === null) throw new ConflictError('Could not find', HTTP_STATUS.NOT_FOUND)
    return evaluations
  }

  async getDashboardData (studentId: string): Promise< { infoStudent: { grade: string, section: string }, courses: Array<{ name: string }> }> {
    const infoStudent = await this.studentRepository.getStudenByStudentId(studentId)
    if (infoStudent === null) throw new ConflictError('Could not find', HTTP_STATUS.NOT_FOUND)
    const courses = await this.studentRepository.getCoursesOfStudent(studentId)
    const listCourse = courses?.courses.map(course => {
      return { name: course.nombre }
    })
    if (listCourse === undefined) throw Error('Course not found')
    return {
      infoStudent: {
        grade: infoStudent.grade,
        section: infoStudent.section
      },
      courses: listCourse
    }
  }
}
