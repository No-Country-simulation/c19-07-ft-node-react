import { Users } from '@prisma/client'
import { CreateUserSchema, UpdateUserSchema } from '../../schemas/user.schema'
import { IUserFilter } from '../../interface/usertInterface'

export interface IUserRepository {
  createUser: (data: CreateUserSchema) => Promise<Omit<Users, 'password' | 'deletedAt'>>
  updateUser: (userId: string, data: UpdateUserSchema) => Promise<Omit<Users, 'password' | 'deletedAt'>>
  softDeleteUser: (userId: string) => Promise<Users>
  restoreUser: (userId: string) => Promise<Users>
  findUserByName: (name: string) => Promise<Users[]>
  getAllUser: (page: number, limit: number, filtros: { name?: string, typeUser?: Users['type_user'] }) => Promise<Array<Omit<Users, 'password'>>>
  countAllusers: () => Promise<number>
  countFilteredUsers: (filtros: IUserFilter) => Promise<number>
  countActiveUsersByTypeUser: (typeUser: Users['type_user']) => Promise<number>
}
