import { UserRepository } from './repositories/user.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from '../errors/authenticationError'
import HTTP_STATUS from '../constants/statusCodeServer.const'
import { Users } from '@prisma/client'
import { RefreshTokenRepository } from './repositories/refreshToken.repository'
export class AuthService {
  constructor (private readonly userRepository: UserRepository, private readonly refreshTokenRepository: RefreshTokenRepository) {}

  async login (email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email)
    if (user == null) {
      throw new AuthenticationError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED, { email: 'is email not found' })
    }

    const isPasswordValid = AuthService.verifyPassword(password, user.password)
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED, { password: 'is password not valid' })
    }

    const accessToken = this.generateAccessToken(user)

    const refreshToken = await this.refreshTokenRepository.createAndStoreRfreshToken(this.generateRefreshToken, user.user_id)
    return { accessToken, refreshToken }
  }

  async logout (refreshToken: string): Promise<void> {
    if (process.env.JWT_REFRESH_SECRET === undefined) {
      throw new AuthenticationError('JWT refresh secret is not defined', HTTP_STATUS.UNAUTHORIZED)
    }

    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    if (typeof decodedRefreshToken !== 'object') {
      throw new AuthenticationError('Invalid refresh token', HTTP_STATUS.UNAUTHORIZED, { refreshToken: 'is not valid' })
    }

    await this.refreshTokenRepository.deleteRefreshToken(decodedRefreshToken.tokenId)
  }

  async refreshToken (refreshToken: string): Promise<{ accessToken: string }> {
    if (process.env.JWT_REFRESH_SECRET == null) {
      throw new Error('JWT refresh secret is not defined')
    }
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    if (typeof decodedRefreshToken !== 'object') {
      throw new AuthenticationError('Invalid refresh token', HTTP_STATUS.UNAUTHORIZED, { refreshToken: 'is not valid' })
    }
    const refreshTokenFromDB = await this.refreshTokenRepository.findRefreshToken(refreshToken)
    if (refreshTokenFromDB === null || refreshTokenFromDB.user_id !== decodedRefreshToken.userId) {
      throw new AuthenticationError('Invalid refresh token', HTTP_STATUS.UNAUTHORIZED, { refreshToken: 'is not valid' })
    }

    const user = await this.userRepository.findById(refreshTokenFromDB.user_id)
    if (user === null) {
      throw new AuthenticationError('User not found', HTTP_STATUS.UNAUTHORIZED, { userId: 'is not valid' })
    }

    const newAccessToken = this.generateAccessToken(user)
    return { accessToken: newAccessToken }
  }

  private generateAccessToken (user: Users): string {
    if (process.env.JWT_SECRET !== undefined) {
      const token = jwt.sign(
        { userId: user.user_id, email: user.email, role: user.type_user },
        process.env.JWT_SECRET,
        { expiresIn: '2m' }
      )
      return token
    } else {
      throw new Error('JWT secret is not defined')
    }
  }

  private generateRefreshToken (userId: string, tokenId: string): string {
    if (process.env.JWT_REFRESH_SECRET !== undefined) {
      const refreshToken = jwt.sign(
        { userId, tokenId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      )
      return refreshToken
    } else {
      throw new Error('JWT refresh secret is not defined')
    }
  }

  static hashPassword (password: string): string {
    const saltRounds = 10
    return bcrypt.hashSync(password, saltRounds)
  }

  static verifyPassword (password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
  }
}
