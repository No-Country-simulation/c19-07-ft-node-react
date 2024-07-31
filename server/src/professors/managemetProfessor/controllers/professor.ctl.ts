import { ICustomRequest } from '../../../types'
import { Response, NextFunction } from 'express'
import { ProfessorsRepository } from '../repositories/professor.rrepository'
import { ProfessorService } from '../professor.service'
import { PrismaClient } from '@prisma/client'
import { ResponseHandler } from '../../../libs/response.lib'
import { formattedErrorsZod } from '../../../libs/formatedErrorsZod'
import { CreateEvaluationResultSchema, createEvaluationResultSchema, CreateEvaluationSchema, createEvaluationSchema, getEvaluationsByPeriodoOfStudentSchema } from '../schemas/professor.schema'
import HTTP_STATUS from '../../../constants/statusCodeServer.const'
import { ZodError } from 'zod'
import { CustomError } from '../../../errors/customError'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const professorService = new ProfessorService(new ProfessorsRepository(new PrismaClient()))

export class ProfessorController {
  async createEvaluation (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateEvaluationSchema = createEvaluationSchema.parse(req.body)
      const evaluation = await professorService.createEvaluation(data)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.CREATED, 'sucessfully', evaluation)
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedError = formattedErrorsZod(error)
        new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'validation Error', formattedError)
      }
      if (error instanceof CustomError && error.name === 'ConflictError') {
        new ResponseHandler(res).sendError(error.statusCode, error.message, error.errors)
      }
      if (error instanceof PrismaClientKnownRequestError) {
        console.log({ ...error, message: error.message, code: error.code, meta: error.meta })
        new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal server error')
      }
      next(error)
    }
  }

  async createEvaluationResult (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateEvaluationResultSchema = createEvaluationResultSchema.parse(req.body)
      const evaluation = await professorService.createEvaluationResult(data)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.CREATED, 'sucessfully', evaluation)
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedError = formattedErrorsZod(error)
        new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'validation Error', formattedError)
      }
      if (error instanceof CustomError && error.name === 'ConflictError') {
        new ResponseHandler(res).sendError(error.statusCode, error.message, error.errors)
      }
      if (error instanceof PrismaClientKnownRequestError) {
        console.log({ ...error, message: error.message, code: error.code, meta: error.meta })
        new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal server error')
      }
      next(error)
    }
  }

  async getEvaluationsByPeriodoOfStudent (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const dataBody = getEvaluationsByPeriodoOfStudentSchema.parse(req.body)
      const data = await professorService.getEvaluationsByPeriodoOfStudent(dataBody.periodo, dataBody.studentId, dataBody.courseId)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'sucessfully', data)
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedError = formattedErrorsZod(error)
        new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'validation Error', formattedError)
      }
      if (error instanceof CustomError && error.name === 'ConflictError') {
        new ResponseHandler(res).sendError(error.statusCode, error.message, error.errors)
      }
      if (error instanceof PrismaClientKnownRequestError) {
        console.log({ ...error, message: error.message, code: error.code, meta: error.meta })
        new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal server error')
      }
      next(error)
    }
  }
}
