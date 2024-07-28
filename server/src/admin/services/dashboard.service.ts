/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Evaluation_results } from '@prisma/client'
import { DashboardRepository } from '../repositories/dashboard.repository'

export class DashboardService {
  constructor (private readonly dashboardRepository: DashboardRepository) {}
  async getTopFiveStudents (): Promise<any> {
    const studentsWitchEvaluations = await this.dashboardRepository.getStudentsWithEvaluations()
    const topStudents = studentsWitchEvaluations
      .map((student) => ({
        student_id: student.student_id,
        name: student.user.name,
        grade: student.grade,
        section: student.section,
        averageMark: this.calculateAverageMarks(student.evaluations_results).toFixed(2)
      }))
      .sort((a, b) => Number(b.averageMark) - Number(a.averageMark))
      .slice(0, 5)

    return topStudents
  }

  private calculateAverageMarks (evaluations: Evaluation_results[]): number {
    const totalMarks = evaluations.reduce((acc, result) => acc + result.mark, 0)
    return evaluations.length > 0 ? totalMarks / evaluations.length : 0
  }
}
