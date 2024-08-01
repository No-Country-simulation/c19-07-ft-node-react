import { ICustomRequest } from '../../../types'
import { Response, NextFunction } from 'express'
import { StudentRepository } from '../repositories/student.repository'
import { StudentService } from '../student.service'
import { PrismaClient } from '@prisma/client'
import { ResponseHandler } from '../../../libs/response.lib'
import { formattedErrorsZod } from '../../../libs/formatedErrorsZod'
import { getEvaluationsByPeriodoOfStudentSchema, queryPeriodoSchema } from '../schemas/student.schema'
import HTTP_STATUS from '../../../constants/statusCodeServer.const'
import { ZodError } from 'zod'
import { CustomError } from '../../../errors/customError'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const studentService = new StudentService(new StudentRepository(new PrismaClient()))

export class StudentCtl {
  async getEvaluationsByPeriodoOfStudent (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const dataBody = getEvaluationsByPeriodoOfStudentSchema.parse(req.body)
      const data = await studentService.getEvaluationsByPeriodoOfStudent(dataBody)
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

  async getDashboardData (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const periodo = queryPeriodoSchema.parse(req.query).periodo
      const data = await studentService.getDashboardData(req.params.studentId, periodo)
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'sucessfully', data)
    } catch (error) {
      if (error instanceof CustomError && error.name === 'ConflictError') {
        new ResponseHandler(res).sendError(error.statusCode, error.message, error.errors)
      }
      if (error instanceof ZodError) {
        const formattedError = formattedErrorsZod(error)
        new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'validation Error', formattedError)
      }
      next(error)
    }
  }
}
