import { Users } from '@prisma/client'
import { CreateUserSchema, UpdateUserSchema } from '../../schemas/user.schema'

export interface IUserRepository {
  createUser: (data: CreateUserSchema) => Promise<Omit<Users, 'password'>>
  updateUser: (userId: string, data: UpdateUserSchema) => Promise<Omit<Users, 'password'>>
  findUserByName: (name: string) => Promise<Users[]>
  findUserById: (userId: string) => Promise<Users | null>
  getAllUser: (page: number, limit: number, filtros: { name?: string, typeUser?: Users['type_user'] }) => Promise<Array<Omit<Users, 'password'>>>
  countAllusers: () => Promise<number>
}
