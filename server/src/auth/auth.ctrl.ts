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
import { AuthenticationError } from '../errors/authenticationError'
import { formattedErrorsZod } from '../libs/formatedErrorsZod'
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
        .cookie('accessToken', data.accessToken, { httpOnly: true, secure: true, sameSite: 'strict' })
        .cookie('refreshToken', data.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' })
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Login successful', null)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = formattedErrorsZod(error)
        return new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', formattedErrors)
      }
      next(error)
    }
  }

  async refreshToken (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.cookies
      if (refreshToken === undefined) {
        throw new AuthenticationError('Invalid refresh token', HTTP_STATUS.UNAUTHORIZED, { refreshToken: 'is not defined' })
      }

      const data = await authService.refreshToken(refreshToken)
      res.cookie('accessToken', data.accessToken, { httpOnly: true, secure: true, sameSite: 'strict' })
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Token refreshed', null)
    } catch (error) {
      next(error)
    }
  }

  async logout (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.cookies
      if (refreshToken === undefined) {
        throw new AuthenticationError('Invalid refresh token', HTTP_STATUS.UNAUTHORIZED, { refreshToken: 'is not defined' })
      }
      await authService.logout(refreshToken)
      res.clearCookie('accessToken').clearCookie('refreshToken')
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Logout successful', null)
    } catch (error) {
      next(error)
    }
  }
}
