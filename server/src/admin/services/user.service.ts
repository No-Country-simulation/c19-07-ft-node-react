import { Users } from '@prisma/client'
import { UserRepository } from '../repositories/user.repository'
import { PaginatedResponse, ResponseHandler } from '../../libs/response.lib'
import { AuthService } from '../../auth/auth.service'
import { CreateUserSchema, UpdateUserSchema } from '../schemas/user.schema'
import { NotFoundError } from '../../errors/notFoundError'
import HTTP_STATUS from '../../constants/statusCodeServer.const'
import { IUserFilter } from '../interface/usertInterface'

export class UserService {
  constructor (private readonly userRepository: UserRepository) {}
  async createUser (data: CreateUserSchema): Promise<Omit<Users, 'password' | 'deletedAt'>> {
    const dataParseUser = { ...data, password: AuthService.hashPassword(data.password) }
    const user = await this.userRepository.createUser(dataParseUser)
    return user
  }

  async updateUser (userId: string, data: UpdateUserSchema): Promise<Omit<Users, 'password' | 'deletedAt'>> {
    const existUser = await this.userRepository.findUserById(userId)
    if (existUser === null) {
      throw new NotFoundError('User not found', HTTP_STATUS.NOT_FOUND)
    }
    const user = await this.userRepository.updateUser(userId, data)
    return user
  }

  async softDeleteUser (userId: string): Promise<Users> {
    const existUser = await this.userRepository.findUserById(userId)
    if (existUser === null) {
      throw new NotFoundError('User not found', HTTP_STATUS.NOT_FOUND)
    }
    const user = await this.userRepository.softDeleteUser(userId)
    return user
  }

  async restoreUser (userId: string): Promise<Users> {
    const existUser = await this.userRepository.findUserById(userId)
    if (existUser === null) {
      throw new NotFoundError('User not found', HTTP_STATUS.NOT_FOUND)
    }
    const user = await this.userRepository.restoreUser(userId)
    return user
  }

  async getAllUsers (page: number, limit: number, filtro: IUserFilter): Promise<PaginatedResponse<Omit<Users, 'password' | 'deletedAt'>>> {
    let baseUrl = ''
    if (
      process.env.BASE_URL !== undefined &&
      process.env.PORT_SERVER !== undefined
    ) {
      baseUrl = `${process.env.BASE_URL}:${process.env.PORT_SERVER}/api/v1/admin/users`
    } else {
      throw new Error('Base URL is not defined')
    }
    const totalUser = await this.userRepository.countFilteredUsers(filtro)
    const users = await this.userRepository.getAllUser(page, limit, filtro)
    const listUsers = ResponseHandler.paginate(users, totalUser, page, limit, baseUrl)
    return listUsers
  }
}
