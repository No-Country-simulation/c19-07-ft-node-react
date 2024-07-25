import { Users } from '@prisma/client'
import { CreateUserSchema } from '../../schemas/user.schema'

export interface IUserRepository {
  createUser: (data: CreateUserSchema) => Promise<Omit<Users, 'password'>>
  findUserByName: (name: string) => Promise<Users[]>
  getAllUser: (page: number, limit: number, filtros: { name?: string, typeUser?: Users['type_user'] }) => Promise<Array<Omit<Users, 'password'>>>
  countAllusers: () => Promise<number>
}
