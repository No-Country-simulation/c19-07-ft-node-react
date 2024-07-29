import HTTP_STATUS from '../../constants/statusCodeServer.const'
import { ConflictError } from '../../errors/conflictError'
import { PaginatedResponse, ResponseHandler } from '../../libs/response.lib'
import { IParentListFormat } from '../interface/parentInterface'
import { IParentFilter } from '../repositories/interface/parent.interface'
import { ParentRepository } from '../repositories/parent.repository'

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

  async createParent (userId: string, relation: string): Promise<void> {
    const existParent = await this.parentRepository.findParentByUserId(userId)
    if (existParent != null) { throw new ConflictError('Could not find', HTTP_STATUS.CONFLICT) }
  }

  async deleteParent (parentId: string): Promise<void> {
    const existingParent = await this.parentRepository.findParentByUserId(parentId)
    if (existingParent == null) { throw new ConflictError('Could not find', HTTP_STATUS.CONFLICT) }

    await this.parentRepository.deleteParent({ parentId })
  }
}
