import { PrismaClient, Users } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextFunction, Response } from 'express'
import { z } from 'zod'
import HTTP_STATUS from '../../constants/statusCodeServer.const'
import { formattedErrorsZod } from '../../libs/formatedErrorsZod'
import { ResponseHandler } from '../../libs/response.lib'
import { ICustomRequest } from '../../types'
import { UserRepository } from '../repositories/user.repository'
import { TypeUserSchemaOptional, typeUserSchemaOptional, CreateUserSchema, createUserSchema, UpdateUserSchema, updateUserSchema, QueryNameSchema, queryNameSchema, queryParamsSchema } from '../schemas/user.schema'
import { UserService } from '../services/user.service'
import { CustomError } from '../../errors/customError'
import { IUserFilter } from '../interface/usertInterface'

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

  async updateUser (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id
      const data: UpdateUserSchema = updateUserSchema.parse(req.body)
      const user = await userService.updateUser(userId, data)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'User updated successfully', user)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'server error')
      }
      if (error instanceof z.ZodError) {
        const errors = formattedErrorsZod(error)
        return new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', errors)
      }
      if (error instanceof CustomError && error.name === 'NotFoundError') {
        return new ResponseHandler(res).sendError(error.statusCode, error.message)
      }
      next(error)
    }
  }

  async softDeleteUser (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id
      const user = await userService.softDeleteUser(userId)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'User deleted successfully', user)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error)
        return new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'server error')
      }
      if (error instanceof CustomError && error.name === 'NotFoundError') {
        return new ResponseHandler(res).sendError(error.statusCode, error.message)
      }
      next(error)
    }
  }

  async restoreUser (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id
      const user = await userService.restoreUser(userId)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'User restored successfully', user)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'server error')
      }
      if (error instanceof CustomError && error.name === 'NotFoundError') {
        return new ResponseHandler(res).sendError(error.statusCode, error.message)
      }
      next(error)
    }
  }

  async getAllUsers (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = isNaN(Number(req.query.page)) ? 1 : Number(req.query.page)
      const limit = isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit)
      const name: QueryNameSchema = queryNameSchema.parse(req.query.name)
      const viewDeleted = req.body.viewDeleted
      // const onlyDeleted = req.body.onlyDeleted as boolean
      const typeUser = typeUserSchemaOptional.parse(req.query['type-user'] as TypeUserSchemaOptional)
      console.log({ typeUser })
      const filtros = { name, typeUser, viewDeleted }
      console.log(filtros)
      const user = await userService.getAllUsers(page, limit, filtros as IUserFilter)
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

  async getActiveUsersByTypeUser (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const typeUser = queryParamsSchema.parse(req.query)['type-user']
      const user = await userService.countActiveUsersByTypeUser(typeUser as Users['type_user'])
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
