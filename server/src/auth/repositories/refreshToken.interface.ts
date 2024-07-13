import { RefreshToken } from '@prisma/client'

export interface IRefreshTokenRepository {
  create: (token: string, userId: string) => Promise<RefreshToken>
  findRefreshToken: (token: string) => Promise<RefreshToken | null>
}
