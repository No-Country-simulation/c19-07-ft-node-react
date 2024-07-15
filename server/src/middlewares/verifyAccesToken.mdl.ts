/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
    const { accessToken } = req.cookies
    if (!accessToken) {
      throw new AuthenticationError('Failed to authenticate token', HTTP_STATUS.UNAUTHORIZED)
    }

    if (process.env.JWT_SECRET == null) {
      throw new Error('JWT secret is not defined')
    }

    try {
      const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET) as any
      req.user = decodedAccessToken
      next()
    } catch (accessTokenError) {
      if (accessTokenError instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError('Access token expired', HTTP_STATUS.UNAUTHORIZED)
      } else {
        throw new AuthenticationError('Failed to authenticate token', HTTP_STATUS.UNAUTHORIZED)
      }
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError('Failed to authenticate token', HTTP_STATUS.UNAUTHORIZED)
    }
    next(error)
  }
}
