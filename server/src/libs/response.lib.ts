import { Response as ExpressResponse } from 'express'

interface ResponseData {
  error: boolean
  statusCode: number
  message: string
  data?: any | null
}

export class ResponseHandler {
  res: ExpressResponse

  constructor (res: ExpressResponse) {
    this.res = res
  }

  sendResponse (statusCode: number, data: any): void {
    const responseData: ResponseData = {
      error: false,
      statusCode,
      message: 'Operation completed successfully',
      data
    }
    this.res.status(statusCode).json(responseData)
  }

  sendError (statusCode: number, message: string, error?: any): void {
    const responseData: ResponseData = {
      error: true,
      statusCode,
      message,
      data: null
    }
    if (error) {
      responseData.error = error.message || error.toString()
    }
    this.res.status(statusCode).json(responseData)
  }
}
