/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { DashboardRepository } from '../repositories/dashboard.repository'
import { IStudentsWitchEvaluations } from '../interface/dashboardInterface'

export class DashboardService {
  constructor (private readonly dashboardRepository: DashboardRepository) { }

  async getDashboardData (): Promise<any> {
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

    const overallAverage = this.calculateOverallAverage(studentsWitchEvaluations)
    const activeStudents = await this.dashboardRepository.countActiveStudents()
    const numberOfTeachers = await this.dashboardRepository.countTeachers()
    const numberofUsers = await this.dashboardRepository.countAllUsers()

    return {
      overallAverage,
      activeStudents,
      numberOfTeachers,
      numberofUsers,
      topStudents
    }
  }

  private calculateAverageMarks (evaluations: Array<{ mark: number }>): number {
    const totalMarks = evaluations.reduce((acc, result) => acc + result.mark, 0)
    return evaluations.length > 0 ? totalMarks / evaluations.length : 0
  }

  private calculateOverallAverage (students: IStudentsWitchEvaluations[]): number {
    const totalMarks = students.reduce((acc, student) => acc + this.calculateAverageMarks(student.evaluations_results), 0)
    return students.length > 0 ? totalMarks / students.length : 0
  }
}
