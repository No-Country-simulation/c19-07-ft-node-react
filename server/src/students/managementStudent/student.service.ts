import { Evaluations } from '@prisma/client'
import { ProfessorsRepository } from './repositories/student.repository'

export class ProfessorService {
  constructor (private readonly professorsRepository: ProfessorsRepository) {}

  async getEvaluationsByPeriodoOfStudent (periodo: Evaluations['periodo'], studentId: string, courseId: string): Promise<Evaluations[]> {
    const evaluations = await this.professorsRepository.getEvaluationsByPeriodoOfStudent(periodo, studentId, courseId)
    return evaluations
  }
}
