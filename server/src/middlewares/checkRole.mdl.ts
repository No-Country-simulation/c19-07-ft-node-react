import { Response, NextFunction } from 'express'
import { ICustomRequest } from '../types'
import { AuthenticationError } from '../errors/authenticationError'
import HTTP_STATUS from '../constants/statusCodeServer.const'

export const checkRole = (role: string[]) => (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user !== undefined && typeof req.user !== 'string' && 'role' in req.user && role.includes(req.user.role)) {
      next()
    } else {
      throw new AuthenticationError('Unauthorized', HTTP_STATUS.UNAUTHORIZED, { role: 'is not authorized' })
    }
  } catch (error) {
    next(error)
  }
}
