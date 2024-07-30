import { Users } from '@prisma/client'
import { CreateUserSchema, UpdateUserSchema } from '../../schemas/user.schema'
import { IUserFilter } from '../../interface/usertInterface'

export interface IUserRepository {
  createUser: (data: CreateUserSchema) => Promise<Omit<Users, 'password' | 'deletedAt'>>
  updateUser: (userId: string, data: UpdateUserSchema) => Promise<Omit<Users, 'password' | 'deletedAt'>>
  softDeleteUser: (userId: string) => Promise<Users>
  restoreUser: (userId: string) => Promise<Users>
  findUserByName: (name: string) => Promise<Users[]>
  findUserById: (userId: string) => Promise<Users | null>
  getAllUser: (page: number,
    limit: number,
    filtros: IUserFilter) => Promise<Array<Omit<Users, 'password' | 'deletedAt'>>>
  countAllusers: () => Promise<number>
  countFilteredUsers: (filtros: IUserFilter) => Promise<number>
  countActiveUsersByTypeUser: (typeUser: Users['type_user']) => Promise<number>
}
