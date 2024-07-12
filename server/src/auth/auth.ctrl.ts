import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth.service'
import { UserRepository } from './repositories/user.repository'
import { PrismaClient } from '@prisma/client'
import { ResponseHandler } from '../libs/response.lib'
import { Login, loginSchema } from './schemas/login.schema'
import { z } from 'zod'
import HTTP_STATUS from '../constants/statusCodeServer.const'
const userRepository = new UserRepository(new PrismaClient())
const authService = new AuthService(userRepository)

export class AuthCtrl {
  async login (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parseData: Login = loginSchema.parse(req.body)
      const { email, password } = parseData
      const data = await authService.login(email, password)
      res.cookie('token', data.token, { httpOnly: false, secure: true })
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
}
