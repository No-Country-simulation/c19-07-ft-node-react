import { PrismaClient } from '@prisma/client'
import { ParentRepository } from '../repositories/parent.repository'
import { ParentService } from '../services/parent.service'
import { ResponseHandler } from '../../libs/response.lib'
import { ICustomRequest } from '../../types'
import { Response, NextFunction } from 'express'
import { createParentSchema, CreateParentSchema, queryParamsSchema, updateParentSchema } from '../schemas/parent.schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { z } from 'zod'
import { formattedErrorsZod } from '../../libs/formatedErrorsZod'
import { UserRepository } from '../repositories/user.repository'
import { CustomError } from '../../errors/customError'
import HTTP_STATUS from '../../constants/statusCodeServer.const'
const parentService = new ParentService(new ParentRepository(new PrismaClient()), new UserRepository(new PrismaClient()))
export class ParentCtrl {
  async getAllParents (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = queryParamsSchema.parse(req.query).page
      const limit = queryParamsSchema.parse(req.query).limit
      const name = queryParamsSchema.parse(req.query).name
      const email = queryParamsSchema.parse(req.query).email
      const viewDeleted = req.body.viewDeleted
      const filters = { name, email, viewDeleted }
      const parent = await parentService.getAllParents(page, limit, filters)
      new ResponseHandler(res).sendResponse(200, 'Get all parents successfully', parent)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return new ResponseHandler(res).sendError(500, 'server error')
      }
      if (error instanceof z.ZodError) {
        const errors = formattedErrorsZod(error)
        return new ResponseHandler(res).sendError(400, 'Validation error', errors)
      }
      next(error)
    }
  }

  async createParent (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, relation }: CreateParentSchema = createParentSchema.parse(req.body)
      const createdParent = await parentService.createParent(userId, relation)
      new ResponseHandler(res).sendResponse(200, 'Parent created successfully', createdParent)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return new ResponseHandler(res).sendError(500, 'server error')
      }
      if (error instanceof CustomError && error.name === 'ConflictError') {
        console.error('error -->', error.stack)
        return new ResponseHandler(res).sendError(error.statusCode, error.message)
      }
      if (error instanceof CustomError && error.name === 'NotFoundError') {
        console.error('error -->', error.stack)
        return new ResponseHandler(res).sendError(error.statusCode, error.message)
      }
      if (error instanceof z.ZodError) {
        const errors = formattedErrorsZod(error)
        return new ResponseHandler(res).sendError(400, 'Validation error', errors)
      }
      next(error)
    }
  }

  async updateParent (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { parentId } = req.params
      const data = updateParentSchema.parse(req.body)
      const updatedParent = await parentService.updateParentAd(parentId, data)
      new ResponseHandler(res).sendResponse(200, 'Parent updated successfully', updatedParent)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error)
        return new ResponseHandler(res).sendError(500, 'server error')
      }
      if (error instanceof z.ZodError) {
        const errors = formattedErrorsZod(error)
        return new ResponseHandler(res).sendError(400, 'Validation error', errors)
      }
      next(error)
    }
  }

  async getParentsNotAssociated (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const parents = await parentService.getParentsNotAssociated()
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Parents not associated', parents)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error)
        return new ResponseHandler(res).sendError(500, 'server error')
      }
      next(error)
    }
  }
}
