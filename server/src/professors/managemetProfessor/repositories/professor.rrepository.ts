import { Courses, Evaluation_results, Evaluations, PrismaClient } from '@prisma/client'
import { CreateEvaluationResultSchema, CreateEvaluationSchema } from '../schemas/professor.schema'
import { IProfessorRepository } from './interface/professor.interface'
import { IEvaluationsAndEvaluationsResults } from '../interface/professor.interface'

export class ProfessorsRepository implements IProfessorRepository {
  constructor (private readonly prisma: PrismaClient) {}
  async createEvaluations (data: CreateEvaluationSchema): Promise<Evaluations> {
    const newEvaluations = await this.prisma.evaluations.create({
      data: {
        curso_id: data.cursoId,
        name: data.name,
        description: data.description,
        periodo: data.periodo
      }
    })
    return newEvaluations
  }

  async findCursoId (id: string): Promise<Courses | null> {
    const courses = await this.prisma.courses.findUnique({
      where: {
        cursos_id: id
      }
    })
    return courses
  }

  async createEvaluationResult (data: CreateEvaluationResultSchema): Promise<Evaluation_results> {
    const newEvaluationResult = await this.prisma.evaluation_results.create({
      data: {
        evaluation_id: data.evaluationId,
        student_id: data.studentId,
        mark: data.mark,
        comment: data.comment
      }
    })
    return newEvaluationResult
  }

  async getEvaluationsByPeriodoOfStudent (periodo: Evaluations['periodo'], studentId: string, courseId: string): Promise<IEvaluationsAndEvaluationsResults[]> {
    const evaluations = await this.prisma.evaluations.findMany({
      where: {
        periodo,
        curso_id: courseId
      },
      include: {
        evaluation_result: {
          where: {
            student_id: studentId
          }
        }
      }
    })
    return evaluations
  }
}
