import { Request } from 'express'
import jwt from 'jsonwebtoken'
export interface ICustomRequest extends Request {
  user?: jwt.JwtPayload
}
