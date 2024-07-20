import { CustomError } from './customError'

export class ConflictError extends CustomError {
  constructor (message: string, statusCode: number, errors: Record<string, string> = {}) {
    super(message, statusCode, errors)
    this.name = 'ConflictError'
    Error.captureStackTrace(this, this.constructor)
  }
}
