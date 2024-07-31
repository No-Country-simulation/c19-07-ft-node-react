import { Academic_areas, Prisma, PrismaClient } from '@prisma/client'
import { IAcademicAreaRepository } from './academicArea.interface'
import { IAcademicAreaFilter } from '../../admin/interface/academicAreaInterface'
import { CreateAcademicAreaSchema, UpdateAcademicAreaSchema } from '../schemas/academicArea.schema'

export class AcademicAreaRepository implements IAcademicAreaRepository {
  constructor (private readonly prisma: PrismaClient) { }

  async createAcademicArea (
    data: CreateAcademicAreaSchema
  ): Promise<Academic_areas> {
    const dataCreated = await this.prisma.academic_areas.create({ data })
    return dataCreated
  }

  async getAcademicAreas (
    page: number,
    limit: number,
    filters: IAcademicAreaFilter
  ): Promise<Academic_areas[]> {
    const whereConditions: Prisma.Academic_areasWhereInput = {}
    if (filters?.name !== undefined) {
      whereConditions.name = {
        contains: filters.name,
        mode: 'insensitive'
      }
    }
    if (filters?.viewDeleted === 'only') {
      whereConditions.deletedAt = { not: null }
    } else if (filters?.viewDeleted !== 'include') {
      whereConditions.deletedAt = null
    }
    const academicAreas = await this.prisma.academic_areas.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereConditions
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
    data: UpdateAcademicAreaSchema,
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

  async countFilteredAcademicAreas (filtros: IAcademicAreaFilter): Promise<number> {
    const whereConditions: Prisma.Academic_areasWhereInput = {}
    if (filtros?.name !== undefined) {
      whereConditions.name = {
        contains: filtros.name,
        mode: 'insensitive'
      }
    }
    if (filtros?.viewDeleted === 'only') {
      whereConditions.deletedAt = { not: null }
    } else if (filtros?.viewDeleted !== 'include') {
      whereConditions.deletedAt = null
    }

    const count = await this.prisma.academic_areas.count({
      where: whereConditions
    })

    return count
  }
}
