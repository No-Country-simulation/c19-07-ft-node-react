import { Prisma, PrismaClient, RefreshToken } from '@prisma/client'
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

  async updateRefreshToken (tokenId: string, token: string): Promise<RefreshToken> {
    const data = await this.prisma.refreshToken.update({
      where: { token_id: tokenId },
      data: { token }
    })
    return data
  }

  async deleteRefreshToken (tokenId: string): Promise<RefreshToken> {
    const data = await this.prisma.refreshToken.delete({ where: { token_id: tokenId } })
    return data
  }

  async deleteAllRefreshTokens (userId: string): Promise<Prisma.BatchPayload> {
    const data = await this.prisma.refreshToken.deleteMany({ where: { user_id: userId } })
    return data
  }

  async createAndStoreRfreshToken (generateRefreshToken: (userId: string, tokenId: string) => string, userId: string): Promise<string> {
    const data = await this.prisma.$transaction(async (prisma) => {
      const refreshTokenFromDB = await prisma.refreshToken.create({
        data: { token: '', user_id: userId }
      })
      const refreshToken = generateRefreshToken(userId, refreshTokenFromDB.token_id)

      // await this.updateRefreshToken(refreshTokenFromDB.token_id, refreshToken)
      await prisma.refreshToken.update({
        where: { token_id: refreshTokenFromDB.token_id },
        data: { token: refreshToken }
      })

      return refreshToken
    })

    return data
  }
}
