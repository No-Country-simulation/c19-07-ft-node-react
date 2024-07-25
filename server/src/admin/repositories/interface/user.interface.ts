import { Users } from '@prisma/client'
import { CreateUserSchema, UpdateUserSchema } from '../../schemas/user.schema'

export interface IUserRepository {
  createUser: (data: CreateUserSchema) => Promise<Omit<Users, 'password' | 'deletedAt'>>
  updateUser: (userId: string, data: UpdateUserSchema) => Promise<Omit<Users, 'password' | 'deletedAt'>>
  softDeleteUser: (userId: string) => Promise<Users>
  restoreUser: (userId: string) => Promise<Users>
  findUserByName: (name: string) => Promise<Users[]>
  findUserById: (userId: string) => Promise<Users | null>
  getAllUser: (page: number, limit: number, filtros: { name?: string, typeUser?: Users['type_user'], includeDeleted?: boolean, onlyDeleted?: boolean }) => Promise<Array<Omit<Users, 'password' | 'deletedAt'>>>
  countAllusers: () => Promise<number>
  countFilteredUsers: (filtros: IUserFilter) => Promise<number>
}

export interface IUserFilter {
  name?: string
  typeUser?: Users['type_user']
  viewDeleted?: 'only' | 'include' | 'none'
}
