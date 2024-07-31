import { Parents } from '@prisma/client'
import { ConflictError } from '../../errors/conflictError'
import { PaginatedResponse, ResponseHandler } from '../../libs/response.lib'
import { IParentFilter, IParentListFormat } from '../interface/parentInterface'
import { ParentRepository } from '../repositories/parent.repository'
import { UserRepository } from '../repositories/user.repository'
import HTTP_STATUS from '../../constants/statusCodeServer.const'

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

  async createParent (userId: string, relation: string): Promise<Parents> {
    const existUser = await this.userRepository.findUserById(userId) // verify if user exists
    if (existUser === null) throw new ConflictError('Could not find', HTTP_STATUS.NOT_FOUND)
    if (existUser.type_user !== 'PARENTS') throw new ConflictError('Could not find', HTTP_STATUS.CONFLICT) // verify if user is a parent

    const existParent = await this.parentRepository.findParentByUserId(userId)
    if (existParent != null) throw new ConflictError('Could not find', HTTP_STATUS.CONFLICT) // verify if user already has a parent

    const newParent = await this.parentRepository.createParent({ userId, relation })
    return newParent
  }

  async updateParentAd (parentId: string, data: Partial<Parents>): Promise<Parents> {
    const existingParent = await this.parentRepository.findParentByParentId(parentId)
    if (existingParent == null) {
      throw new ConflictError('Could not find', HTTP_STATUS.CONFLICT)
    }
    const updatedParent = await this.parentRepository.updateParent(parentId, data)
    return updatedParent
  }
}
