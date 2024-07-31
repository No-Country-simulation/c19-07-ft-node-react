import { Evaluation_results, Evaluations } from '@prisma/client'
import HTTP_STATUS from '../../constants/statusCodeServer.const'
import { ConflictError } from '../../errors/conflictError'
import { ProfessorsRepository } from './repositories/professor.rrepository'
import { CreateEvaluationResultSchema, CreateEvaluationSchema } from './schemas/professor.schema'

export class ProfessorService {
  constructor (private readonly professorsRepository: ProfessorsRepository) {}
  async createEvaluation (data: CreateEvaluationSchema): Promise<Evaluations> {
    const existingCourse = await this.professorsRepository.findCursoId(data.cursoId)
    if (existingCourse === null) throw new ConflictError('Course not found', HTTP_STATUS.NOT_FOUND)
    const newEvaluations = await this.professorsRepository.createEvaluations(data)
    return newEvaluations
  }

  async createEvaluationResult (data: CreateEvaluationResultSchema): Promise<Evaluation_results> {
    const newEvaluationResult = await this.professorsRepository.createEvaluationResult(data)
    return newEvaluationResult
  }

  async getEvaluationsByPeriodoOfStudent (periodo: Evaluations['periodo'], studentId: string, courseId: string): Promise<Evaluations[]> {
    const evaluations = await this.professorsRepository.getEvaluationsByPeriodoOfStudent(periodo, studentId, courseId)
    return evaluations
  }
}
