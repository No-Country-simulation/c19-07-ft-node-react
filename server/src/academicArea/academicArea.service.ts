import { Academic_areas } from '@prisma/client'
import { AcademicAreaRepository } from './repositories/academicArea.repository'
import { ConflictError } from '../errors/conflictError'
import HTTP_STATUS from '../constants/statusCodeServer.const'
import { NotFoundError } from '../errors/notFoundError'
import { ResponseHandler } from '../libs/response.lib'
import { IAcademicAreaFilter } from '../admin/interface/academicAreaInterface'
import { CreateAcademicAreaSchema, UpdateAcademicAreaSchema } from './schemas/academicArea.schema'
export class AcademicAreaService {
  constructor (
    private readonly academicAreaRepository: AcademicAreaRepository
  ) {}

  async createAcademicArea (
    data: CreateAcademicAreaSchema
  ): Promise<Academic_areas> {
    const academicAreaExists =
      await this.academicAreaRepository.findByNameAndEducationalLevel(
        data.name,
        data.educational_level
      )

    if (academicAreaExists != null) {
      throw new ConflictError(
        'Academic area already exists',
        HTTP_STATUS.CONFLICT,
        { name: 'is already in use' }
      )
    }

    const academicArea = await this.academicAreaRepository.createAcademicArea(
      data
    )

    return academicArea
  }

  async getAcademicAreas (
    page: number,
    limit: number,
    filters: IAcademicAreaFilter
  ): Promise<
    {
      items: Academic_areas[]
      meta: {
        totalItems: number
        itemCount: number
        itemsPerPage: number
        totalPages: number
        currentPage: number
        nextPage: string | null
        prevPage: string | null
      }
    }
    > {
    let baseUrl = ''
    if (
      process.env.BASE_URL !== undefined &&
      process.env.PORT_SERVER !== undefined
    ) {
      baseUrl = `${process.env.BASE_URL}:${process.env.PORT_SERVER}/api/v1/academic-area`
    } else {
      throw new Error('Base URL is not defined')
    }

    const totalAcademicAreas =
      await this.academicAreaRepository.countFilteredAcademicAreas(filters)
    if (totalAcademicAreas === 0) {
      throw new NotFoundError(
        'Academic areas not found',
        HTTP_STATUS.NOT_FOUND
      )
    }

    const academicAreas = await this.academicAreaRepository.getAcademicAreas(
      page,
      limit,
      filters
    )

    return ResponseHandler.paginate(academicAreas, totalAcademicAreas, page, limit, baseUrl)
  }

  async getAcademicAreaById (
    academicAreaId: string
  ): Promise<Academic_areas> {
    const academicArea = await this.academicAreaRepository.getAcademicAreaById(
      academicAreaId
    )

    if (academicArea === null) {
      throw new NotFoundError(
        'Academic area not found',
        HTTP_STATUS.NOT_FOUND
      )
    }
    return academicArea
  }

  async deleteAcademicAreaById (
    academicAreaId: string
  ): Promise<Academic_areas> {
    const academicAreaExists = await this.academicAreaRepository.getAcademicAreaById(
      academicAreaId
    )
    if (academicAreaExists === null) {
      throw new NotFoundError(
        'Academic area not found',
        HTTP_STATUS.NOT_FOUND
      )
    }

    const deletedAcademicArea = await this.academicAreaRepository.deleteAcademicAreaById(
      academicAreaId
    )
    return deletedAcademicArea
  }

  async updateAcademicAreaSchema (
    data: UpdateAcademicAreaSchema,
    academicAreaId: string
  ): Promise<Academic_areas> {
    const academicAreaExists = await this.academicAreaRepository.getAcademicAreaById(
      academicAreaId
    )
    if (academicAreaExists === null) {
      throw new NotFoundError(
        'Academic area not found',
        HTTP_STATUS.NOT_FOUND
      )
    }
    const updatedAcademicArea = await this.academicAreaRepository.updateAcademicAreaById(
      data,
      academicAreaId
    )
    return updatedAcademicArea
  }
}
