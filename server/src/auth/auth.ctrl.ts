import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth.service'
import { UserRepository } from './repositories/user.repository'
import { RefreshTokenRepository } from './repositories/refreshToken.repository'
import { PrismaClient } from '@prisma/client'
import { ResponseHandler } from '../libs/response.lib'
import { Login, loginSchema } from './schemas/login.schema'
import { z } from 'zod'
import HTTP_STATUS from '../constants/statusCodeServer.const'
import { ICustomRequest } from '../types'
const refreshTokenRepository = new RefreshTokenRepository(new PrismaClient())
const userRepository = new UserRepository(new PrismaClient())
const authService = new AuthService(userRepository, refreshTokenRepository)

export class AuthCtrl {
  async login (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parseData: Login = loginSchema.parse(req.body)
      const { email, password } = parseData
      const data = await authService.login(email, password)
      res
        .cookie('accessToken', data.accessToken, { httpOnly: false, secure: true })
        .cookie('refreshToken', data.refreshToken, { httpOnly: false, secure: true })
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Login successful', null)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce<Record<string, string>>((acc, err) => {
          acc[err.path[0]] = err.message
          return acc
        }, {})
        new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', formattedErrors)
      }
      next(error)
    }
  }

  async refreshToken (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.cookies
      if (!refreshToken) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Refresh token not provided' })
      }

      const data = await this.authService.refreshToken(refreshToken)
      res.cookie('accessToken', data.accessToken, { httpOnly: true, secure: true })
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Token refreshed', null)
    } catch (error) {
      next(error)
    }
  }
}
