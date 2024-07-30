import { DatabaseError } from '../errors/databaseError'
import { ValidationError } from '../errors/validationError'
import { ErrorMessageAndStatus } from '../types/error.type'

export const getErrorMessageAndStatus = (error: Error): ErrorMessageAndStatus => {
  if (error instanceof DatabaseError) return { message: 'A Database Error ocurred', status: 503 }
  if (error instanceof ValidationError) return { message: 'The body has an invalid property', status: 400 }
  return { message: 'Server internal error, error unknown', status: 500 }
}
