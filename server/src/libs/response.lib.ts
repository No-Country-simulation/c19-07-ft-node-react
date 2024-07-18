import { Response as ExpressResponse } from 'express'

interface ISuccessResponse {
  success: boolean
  statusCode: number
  message: string
  data?: any | null
}

interface IErrorResponse {
  success: false
  statusCode: number
  message: string
  errors: Record<string, string>
}
export class ResponseHandler {
  res: ExpressResponse

  constructor (res: ExpressResponse) {
    this.res = res
  }

  sendResponse (statusCode: number, message: string, data: any): void {
    const responseData: ISuccessResponse = {
      success: true,
      statusCode,
      message: message === '' ? 'Operation completed successfully' : message,
      data
    }
    this.res.status(statusCode).json(responseData)
  }

  sendError (statusCode: number, message: string, errors: Record<string, string> = {}): void {
    const responseData: IErrorResponse = {
      success: false,
      statusCode,
      message,
      errors
    }

    this.res.status(statusCode).json(responseData)
  }
}
