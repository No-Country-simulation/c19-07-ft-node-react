import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/auth.service'
import { UserRepository } from '../repositories/user.repository'
import { PrismaClient } from '@prisma/client'
import { ResponseHandler } from '../../libs/response.lib'
const userRepository = new UserRepository(new PrismaClient())
const authService = new AuthService(userRepository)

export class AuthCtrl {
  async login (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.login(req.body.email, req.body.password)
      const responseHandler = new ResponseHandler(res)

      responseHandler.sendResponse(200, user)
    } catch (error) {
      next(error)
    }
  }
}
