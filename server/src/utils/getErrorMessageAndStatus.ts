import { DatabaseError } from '../errors/databaseError'
import { NotFoundError } from '../errors/notFoundError'
import { ValidationError } from '../errors/validationError'
import { ErrorMessageAndStatus } from '../types/error.type'

export const getErrorMessageAndStatus = (error: Error): ErrorMessageAndStatus => {
  if (error instanceof DatabaseError) return { message: 'A Database Error ocurred', status: 503 }
  if (error instanceof ValidationError) return { message: 'Data send in the params or in the body are invalid', status: 400 }
  if (error instanceof NotFoundError) return { message: 'Alert not found in the database', status: 404 }
  return { message: 'Server internal error, error unknown', status: 500 }
}
