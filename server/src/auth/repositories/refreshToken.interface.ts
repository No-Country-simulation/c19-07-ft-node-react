import { Prisma, RefreshToken } from '@prisma/client'

export interface IRefreshTokenRepository {
  create: (token: string, userId: string) => Promise<RefreshToken>
  findRefreshToken: (token: string) => Promise<RefreshToken | null>
  createAndStoreRfreshToken: (generateRefreshToken: (userId: string, tokenId: string) => string, userId: string) => Promise<string>
  updateRefreshToken: (tokenId: string, token: string) => Promise<RefreshToken>
  deleteRefreshToken: (tokenId: string) => Promise<RefreshToken>
  deleteAllRefreshTokens: (userId: string) => Promise<Prisma.BatchPayload>
}
