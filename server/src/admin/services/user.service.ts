import { Users } from '@prisma/client'
import { UserRepository } from '../repositories/user.repository'
import { PaginatedResponse, ResponseHandler } from '../../libs/response.lib'

export class UserService {
  constructor (private readonly userRepository: UserRepository) {}

  async getAllUsers (page: number, limit: number, filtro: {
    name: string
    typeUser: Users['type_user']
  }): Promise<PaginatedResponse<Omit<Users, 'password'>>> {
    let baseUrl = ''
    if (
      process.env.BASE_URL !== undefined &&
      process.env.PORT_SERVER !== undefined
    ) {
      baseUrl = `${process.env.BASE_URL}:${process.env.PORT_SERVER}/api/v1/academic-area`
    } else {
      throw new Error('Base URL is not defined')
    }
    const totalUser = await this.userRepository.countAllusers()
    const users = await this.userRepository.getAllUser(page, limit, filtro)
    const listUsers = ResponseHandler.paginate(users, totalUser, page, limit, baseUrl)
    return listUsers
  }
}
