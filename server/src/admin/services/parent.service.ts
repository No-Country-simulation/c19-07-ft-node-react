import { Parents } from '@prisma/client'
import { ConflictError } from '../../errors/conflictError'
import { PaginatedResponse, ResponseHandler } from '../../libs/response.lib'
import { IParentFilter, IParentListFormat } from '../interface/parentInterface'
import { ParentRepository } from '../repositories/parent.repository'

export class ParentService {
  constructor (private readonly parentRepository: ParentRepository, private readonly userRepository: UserRepository) {}

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
}
