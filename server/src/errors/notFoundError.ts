import { CustomError } from './customError'

export class NotFoundError extends CustomError {
  constructor (message: string, statusCode: number, errors: Record<string, string> = {}) {
    super(message, statusCode, errors)
    this.name = 'NotFoundError'
    Error.captureStackTrace(this, this.constructor)
  }
}
