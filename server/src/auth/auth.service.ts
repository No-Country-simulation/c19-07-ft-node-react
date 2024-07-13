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

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED, { password: 'is password not valid' })
    }

    const accessToken = this.generateAccessToken(user)
    const refreshToken = this.generateRefreshToken(user)

    await this.refreshTokenRepository.create(refreshToken, user.user_id)
    return { accessToken, refreshToken }
  }

  async refreshToken (refreshToken: string): Promise<{ accessToken: string }> {
    if (process.env.JWT_REFRESH_SECRET == null) {
      throw new Error('JWT refresh secret is not defined')
    }
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    const refreshTokenFromDB = await this.refreshTokenRepository.findRefreshToken(refreshToken)
    if (refreshTokenFromDB === null || refreshTokenFromDB.user_id !== decodedRefreshToken.userId) {
      throw new AuthenticationError('Invalid refresh token', HTTP_STATUS.UNAUTHORIZED)
    }

    const user = await this.userRepository.findById(refreshTokenFromDB.user_id)
    if (user === null) {
      throw new AuthenticationError('User not found', HTTP_STATUS.UNAUTHORIZED)
    }

    const newAccessToken = this.generateAccessToken(user)
    return { accessToken: newAccessToken }
  }

  private generateAccessToken (user: Users): string {
    if (process.env.JWT_SECRET != null) {
      const token = jwt.sign(
        { userId: user.user_id, email: user.email, role: user.type_user },
        process.env.JWT_SECRET,
        { expiresIn: '3h' }
      )
      return token
    } else {
      throw new Error('JWT secret is not defined')
    }
  }

  private generateRefreshToken (user: Users): string {
    if (process.env.JWT_REFRESH_SECRET != null) {
      const refreshToken = jwt.sign(
        { userId: user.user_id, email: user.email, role: user.type_user },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      )
      return refreshToken
    } else {
      throw new Error('JWT refresh secret is not defined')
    }
  }
}
