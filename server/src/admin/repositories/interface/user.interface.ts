import { Users } from '@prisma/client'

export interface IUserRepository {
  findUserByName: (name: string) => Promise<Users[]>
  getAllUser: (page: number, limit: number, filtros: { name?: string, typeUser?: Users['type_user'] }) => Promise<Array<Omit<Users, 'password'>>>
  countAllusers: () => Promise<number>
}
