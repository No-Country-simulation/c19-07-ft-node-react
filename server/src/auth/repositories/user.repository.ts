import { PrismaClient, Users } from '@prisma/client'
import { IUserRepository } from './user.interface'

export class UserRepository implements IUserRepository {
  constructor (private readonly prisma: PrismaClient) {}
  async findByEmail (email: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { email } })
  }

  async findById (id: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { user_id: id } })
  }
}
