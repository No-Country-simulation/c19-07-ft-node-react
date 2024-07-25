import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextFunction, Response } from 'express'
import { z } from 'zod'
import HTTP_STATUS from '../../constants/statusCodeServer.const'
import { formattedErrorsZod } from '../../libs/formatedErrorsZod'
import { ResponseHandler } from '../../libs/response.lib'
import { ICustomRequest } from '../../types'
import { UserRepository } from '../repositories/user.repository'
import { TypeUserSchemaOptional, typeUserSchemaOptional, CreateUserSchema, createUserSchema } from '../schemas/user.schema'
import { UserService } from '../services/user.service'
const userService = new UserService(new UserRepository(new PrismaClient()))
export class UserCtrl {
  async createUser (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateUserSchema = createUserSchema.parse(req.body)
      const user = await userService.createUser(data)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.CREATED, 'User created successfully', user)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'server error')
      }
      if (error instanceof z.ZodError) {
        const errors = formattedErrorsZod(error)
        return new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', errors)
      }
      next(error)
    }
  }

  async getAllUsers (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = isNaN(Number(req.query.page)) ? 1 : Number(req.query.page)
      const limit = isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit)
      const name = req.query.name as string

      const typeUser = typeUserSchemaOptional.parse(req.query['type-user'] as TypeUserSchemaOptional)
      const filtros = { name, typeUser }

      const user = await userService.getAllUsers(page, limit, filtros)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'User retrieved successfully', user)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'server error')
      }
      if (error instanceof z.ZodError) {
        const errors = formattedErrorsZod(error)
        return new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', errors)
      }
      next(error)
    }
  }
}