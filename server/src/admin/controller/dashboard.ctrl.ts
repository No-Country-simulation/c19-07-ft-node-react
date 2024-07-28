import { PrismaClient } from '@prisma/client'
import { DashboardRepository } from '../repositories/dashboard.repository'
import { DashboardService } from '../services/dashboard.service'
import { ResponseHandler } from '../../libs/response.lib'
import { ICustomRequest } from '../../types'
import { Response, NextFunction } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import HTTP_STATUS from '../../constants/statusCodeServer.const'

const dashboardService = new DashboardService(new DashboardRepository(new PrismaClient()))

export class DashboardCtrl {
  async getTopFiveStudents (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const topFiveStudents = await dashboardService.getTopFiveStudents()
      new ResponseHandler(res).sendResponse(HTTP_STATUS.OK, 'Top five students retrieved successfully', topFiveStudents)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'server error')
      }
      next(error)
    }
  }
}
