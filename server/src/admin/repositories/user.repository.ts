import { PrismaClient, Users } from '@prisma/client'
import { IUserRepository } from './interface/user.interface'

export class UserRepository implements IUserRepository {
  constructor (private readonly prisma: PrismaClient) {}
  async findUserByName (name: string): Promise<Users[]> {
    const user = await this.prisma.users.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    })
    return user
  }

  async countAllusers (): Promise<number> {
    const count = await this.prisma.users.count()
    return count
  }

  async getAllUser (page: number, limit: number, filtros: { name: string, typeUser: Users['type_user'] }): Promise<Array<Omit<Users, 'password'>>> {
    const user = await this.prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        name: {
          contains: filtros.name,
          mode: 'insensitive'
        },
        type_user: filtros.typeUser
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        type_user: true,
        state: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return user
  }
}
