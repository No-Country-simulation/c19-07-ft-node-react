import { PrismaClient } from '@prisma/client'
import { AcademicAreaRepository } from './repositories/academicArea.repository'
import { AcademicAreaService } from './academicArea.service'
import { ICustomRequest } from '../types'
import { NextFunction, Response } from 'express'
import { ResponseHandler } from '../libs/response.lib'
import {
  CreateAcademicAreaSchema,
  AcademicAreaId,
  academicAreaIdSchema,
  createAcademicAreaSchema,
  UpdateAcademicAreaSchema
} from './schemas/academicArea.schema'
import HTTP_STATUS from '../constants/statusCodeServer.const'
import { z } from 'zod'
import { formattedErrorsZod } from '../libs/formatedErrorsZod'
import { IAcademicAreaFilter } from '../admin/interface/academicAreaInterface'
const academicAreaService = new AcademicAreaService(
  new AcademicAreaRepository(new PrismaClient())
)
export class AcademicAreaCtrl {
  async createAcademicArea (
    req: ICustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: CreateAcademicAreaSchema = createAcademicAreaSchema.parse(req.body)
      const academicArea = await academicAreaService.createAcademicArea(data)
      new ResponseHandler(res).sendResponse(
        HTTP_STATUS.OK,
        'Academic area created successfully',
        academicArea
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = formattedErrorsZod(error)
        return new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', errors)
      }
      next(error)
    }
  }

  async getAcademicAreas (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = isNaN(Number(req.query.page)) ? 1 : Number(req.query.page)
      const limit = isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit)
      const name = req.query.name as string
      const viewDeleted = req.body.viewDeleted
      const filters: IAcademicAreaFilter = { name, viewDeleted }
      const academicAreas = await academicAreaService.getAcademicAreas(page, limit, filters)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Academic areas retrieved successfully', academicAreas)
    } catch (error) {
      next(error)
    }
  }

  async getAcademicAreaById (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const academicAreaId = req.params.academicAreaId
      const academicArea = await academicAreaService.getAcademicAreaById(academicAreaId)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Academic area retrieved successfully', academicArea)
    } catch (error) {
      next(error)
    }
  }

  async deleteAcademicAreaById (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const academicAreaId = req.params.academicAreaId
      const deletedAcademicArea = await academicAreaService.deleteAcademicAreaById(academicAreaId)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Academic area deleted successfully', deletedAcademicArea)
    } catch (error) {
      next(error)
    }
  }

  async AcademicAreaPutById (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const academicAreaId: AcademicAreaId = academicAreaIdSchema.parse(req.params.academicAreaId)
      const data: UpdateAcademicAreaSchema = createAcademicAreaSchema.parse(req.body)
      const updatedAcademicArea = await academicAreaService.updateAcademicAreaSchema(data, academicAreaId)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Academic area updated successfully', updatedAcademicArea)
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error)
        const errors = formattedErrorsZod(error)
        return new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', errors)
      }
      next(error)
    }
  }
}
