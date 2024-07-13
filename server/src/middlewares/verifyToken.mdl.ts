import { Response, NextFunction } from 'express'
import { AuthenticationError } from '../errors/authenticationError'
import HTTP_STATUS from '../constants/statusCodeServer.const'
import jwt from 'jsonwebtoken'
import { ICustomRequest } from '../types'
export const verifyToken = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token
    if (token !== undefined && process.env.JWT_SECRET !== undefined) {
      console.log('-->', token)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decodedToken
      console.log('---->', req.user)
      next()
    } else {
      throw new Error('JWT secret is not defined')
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError('Failed to authenticate token', HTTP_STATUS.UNAUTHORIZED)
    }
    next(error)
  }
}
