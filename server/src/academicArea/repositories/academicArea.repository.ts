import { Academic_areas, PrismaClient } from '@prisma/client'
import { IAcademicAreaRepository } from './academicArea.interface'

export class AcademicAreaRepository implements IAcademicAreaRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async createAcademicArea (
    data: Omit<Academic_areas, 'academic_area_id' | 'createdAt' | 'updatedAt'>
  ): Promise<Academic_areas> {
    const dataCreated = await this.prisma.academic_areas.create({ data })
    return dataCreated
  }

  async getAcademicAreas (
    page: number,
    limit: number
  ): Promise<Academic_areas[]> {
    const academicAreas = await this.prisma.academic_areas.findMany({
      skip: (page - 1) * limit,
      take: limit
    })
    return academicAreas
  }

  async getAcademicAreaById (
    academicAreaId: string
  ): Promise<Academic_areas | null> {
    const academicArea = await this.prisma.academic_areas.findUnique({
      where: { academic_area_id: academicAreaId }
    })
    return academicArea
  }

  async deleteAcademicAreaById (
    academicAreaId: string
  ): Promise<Academic_areas> {
    const deletedAcademicArea = await this.prisma.academic_areas.delete({
      where: { academic_area_id: academicAreaId }
    })
    return deletedAcademicArea
  }

  async updateAcademicAreaById (
    data: Omit<Academic_areas, 'academic_area_id' | 'createdAt' | 'updatedAt'>,
    academicAreaId: string
  ): Promise<Academic_areas> {
    const updatedAcademicArea = await this.prisma.academic_areas.update({
      where: { academic_area_id: academicAreaId },
      data
    })
    return updatedAcademicArea
  }

  async findByNameAndEducationalLevel (
    name: string,
    educationalLevel: string
  ): Promise<Academic_areas | null> {
    const academicArea = await this.prisma.academic_areas.findFirst({
      where: { name, educational_level: educationalLevel }
    })
    return academicArea
  }

  async countAcademicAreas (): Promise<number> {
    const count = await this.prisma.academic_areas.count()
    return count
  }
}
