/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Evaluations } from '@prisma/client'
import { StudentRepository } from './repositories/student.repository'
import { ConflictError } from '../../errors/conflictError'
import HTTP_STATUS from '../../constants/statusCodeServer.const'
import { GetEvaluationsByPeriodoOfStudentSchema, QueryPeriodoSchema } from './schemas/student.schema'

export class StudentService {
  constructor (private readonly studentRepository: StudentRepository) { }

  async getEvaluationsByPeriodoOfStudent (data: GetEvaluationsByPeriodoOfStudentSchema): Promise<Evaluations[]> {
    const evaluations = await this.studentRepository.getEvaluationsByPeriodoOfStudent(data)
    if (evaluations === null) throw new ConflictError('Could not find', HTTP_STATUS.NOT_FOUND)
    return evaluations
  }

  async getDashboardData (studentId: string, periodo: QueryPeriodoSchema['periodo']): Promise<{
    infoStudent: { grade: string, section: string, name: string }
    courses: Array<{ name: string }>
    overallAverageByPeriod: Array<{ period: string, average: number }>
    evaluationsByPeriod: Array<{ period: string, evaluations: Array<{ evaluationId: string, courseId: string, nameEvaluation: string, nameCourse: string, evaluationResult: { mark: number, coment: string } }> }>
  }> {
    const infoStudent = await this.studentRepository.getStudenByStudentId(studentId)
    if (infoStudent === null) throw new ConflictError('Could not find', HTTP_STATUS.NOT_FOUND)

    const courses = await this.studentRepository.getCoursesOfStudent(studentId)
    const listCourse = courses?.courses.map(course => ({
      name: course.nombre
    }))
    if (listCourse === undefined) throw Error('Course not found')

    const allEvaluations = await this.studentRepository.getEvaluationsByPeriodoOfStudent({ studentId, courseId: undefined, periodo })
    if (allEvaluations === null) throw new ConflictError('Could not find', HTTP_STATUS.NOT_FOUND)

    const evaluationsByPeriod = allEvaluations.reduce((acc: { [key: string]: Array<{ evaluationId: string, courseId: string, nameEvaluation: string, nameCourse: string, evaluationResult: { mark: number, coment: string } }> }, evaluation) => {
      const period = evaluation.periodo
      if (period === null) throw Error('Period not found')
      if (!acc[period]) {
        acc[period] = []
      }
      acc[period].push({
        evaluationId: evaluation.evaluation_id,
        courseId: evaluation.curso_id,
        nameEvaluation: evaluation.name,
        nameCourse: evaluation.curso.nombre,
        evaluationResult: evaluation.evaluation_result.map(result => ({
          mark: result.mark,
          coment: result.comment
        }))[0]
      })
      return acc
    }, {})

    // Calcular promedio general por periodo
    const overallAverageByPeriod = Object.keys(evaluationsByPeriod).map(period => {
      const evaluations = evaluationsByPeriod[period]
      const totalMarks = evaluations.reduce((sum, evaluation) => sum + evaluation.evaluationResult.mark, 0)
      const average = totalMarks / evaluations.length
      return { period, average }
    })

    // Formatear evaluaciones por periodo en un array
    const formattedEvaluationsByPeriod = Object.keys(evaluationsByPeriod).map(period => ({
      period,
      evaluations: evaluationsByPeriod[period]
    }))

    return {
      infoStudent: {
        name: infoStudent.user.name,
        grade: infoStudent.grade,
        section: infoStudent.section
      },
      courses: listCourse,
      overallAverageByPeriod,
      evaluationsByPeriod: formattedEvaluationsByPeriod
    }
  }

  async getLast10EvaluationResults (studentId: string): Promise<Array<{ evaluationId: string, nameEvaluation: string, nameCourse: string, mark: number, comment: string, createdAt: Date }>> {
    const evaluations = await this.studentRepository.getLast10EvaluationResults(studentId)
    if (evaluations === null) throw new ConflictError('Could not find', HTTP_STATUS.NOT_FOUND)
    const formattedEvaluations = evaluations.map(result => ({
      evaluationId: result.evaluation_id,
      nameEvaluation: result.evaluation.name,
      nameCourse: result.evaluation.curso.nombre,
      mark: result.mark,
      comment: result.comment,
      createdAt: result.createdAt
    }))
    if (formattedEvaluations.length === 0) throw new ConflictError('Could not find', HTTP_STATUS.NOT_FOUND)
    else return formattedEvaluations
  }
}
