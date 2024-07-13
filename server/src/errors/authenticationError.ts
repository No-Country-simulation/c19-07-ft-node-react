import { CustomError } from './customError'

export class AuthenticationError extends CustomError {
  constructor (message: string, statusCode: number, errors: Record<string, string> = {}) {
    super(message, statusCode, errors)
    this.name = 'LoginError'
    Error.captureStackTrace(this, this.constructor)
  }
}
