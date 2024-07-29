import { PrismaClient } from '@prisma/client'
import { IdashboardRepository } from './interface/dashboard.interface'
import { IStudentsWitchEvaluations } from '../interface/dashboardInterface'
export class DashboardRepository implements IdashboardRepository {
  constructor (private readonly prisma: PrismaClient) { }

  async getStudentsWithEvaluations (): Promise<IStudentsWitchEvaluations[]> {
    const students = await this.prisma.students.findMany({
      include: {
        evaluations_results: true,
        user: true
      }
    })
    console.log('estudents witch evaluations', students[0])
    return students
  }

  async countActiveStudents (): Promise<number> {
    return await this.prisma.users.count({
      where: { type_user: 'STUDENT', state: 'ACTIVE' }
    })
  }

  async countTeachers (): Promise<number> {
    return await this.prisma.users.count({
      where: { type_user: 'PROFESSOR' }
    })
  }

  async countAllUsers (): Promise<number> {
    const count = await this.prisma.users.count(
      {
        where: { deletedAt: null }
      }
    )
    return count
  }
}
