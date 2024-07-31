import HTTP_STATUS from '../../constants/statusCodeServer.const'
import { ConflictError } from '../../errors/conflictError'
import { PaginatedResponse, ResponseHandler } from '../../libs/response.lib'
import { IParentListFormat } from '../interface/parentInterface'
import { IParentFilter } from '../repositories/interface/parent.interface'
import { ParentRepository } from '../repositories/parent.repository'
import { Parents } from '@prisma/client'

export class ParentService {
  constructor (private readonly parentRepository: ParentRepository) {}

  async getAllParents (page: number, limit: number, filtro: IParentFilter): Promise<PaginatedResponse<IParentListFormat>> {
    let baseUrl = ''
    if (
      process.env.BASE_URL !== undefined &&
        process.env.PORT_SERVER !== undefined
    ) {
      baseUrl = `${process.env.BASE_URL}:${process.env.PORT_SERVER}/api/v1/admin/parents`
    } else {
      throw new Error('Base URL is not defined')
    }
    const totalParents = await this.parentRepository.countFilteredParents(filtro)
    const parents = await this.parentRepository.getAllParents(page, limit, filtro)

    const formatParents: IParentListFormat[] = parents.map((parent) => {
      return {
        parent_id: parent.parent_id,
        user_id: parent.user_id,
        name: parent.user.name,
        email: parent.user.email,
        relation: parent.relation,
        createdAt: parent.createdAt,
        updatedAt: parent.updatedAt
      }
    })

    const listParents = ResponseHandler.paginate(formatParents, totalParents, page, limit, baseUrl)
    return listParents
  }

  async createParent (userId: string, relation: string): Promise<Parents> {
    const existParent = await this.parentRepository.findParentByUserId(userId)
    if (existParent != null) {
      throw new ConflictError('Parent already exists', HTTP_STATUS.CONFLICT)
    }
    const parent = await this.parentRepository.createParent({ userId, relation })
    return parent
  }

  async deleteParent (parentId: string): Promise<void> {
    const existingParent = await this.parentRepository.findParentByUserId(parentId)
    if (existingParent == null) { throw new ConflictError('Could not find', HTTP_STATUS.CONFLICT) }

    await this.parentRepository.deleteParent({ parentId })
  }

  async updateParentAd (parentId: string, data: Partial<Parents>): Promise<Parents> {
    const existingParent = await this.parentRepository.findParentByUserId(parentId)
    if (existingParent == null) {
      throw new ConflictError('Could not find', HTTP_STATUS.CONFLICT)
    }
    const updatedParent = await this.parentRepository.updateParentAd(parentId, data)
    return updatedParent
  }
}
