export class CustomError extends Error {
  statusCode: number
  errors: Record<string, string>
  constructor (message: string, statusCode: number, errors: Record<string, string> = {}) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    this.name = 'CustomError'
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}
