import { PrismaClient, RefreshToken } from '@prisma/client'
import { IRefreshTokenRepository } from './refreshToken.interface'

export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor (private readonly prisma: PrismaClient) {}
  async create (token: string, userId: string): Promise<RefreshToken> {
    const data = await this.prisma.refreshToken.create({ data: { token, user_id: userId } })
    return data
  }

  async findRefreshToken (token: string): Promise<RefreshToken | null> {
    const data = await this.prisma.refreshToken.findUnique({ where: { token } })
    return data
  }
}
