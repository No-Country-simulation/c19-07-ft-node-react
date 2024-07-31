import { Evaluations, PrismaClient } from '@prisma/client'

import { IProfessorRepository } from './interface/student.interface'
import { IEvaluationsAndEvaluationsResults } from '../interface/student.interface'

export class ProfessorsRepository implements IProfessorRepository {
  constructor (private readonly prisma: PrismaClient) {}
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
