import { DatabaseError } from '../errors/databaseError'
import { ErrorMessageAndStatus } from '../types/error.type'

export const getErrorMessageAndStatus = (error: Error): ErrorMessageAndStatus => {
  if (error instanceof DatabaseError) return { message: 'A Database Error ocurred', status: 503 }
  return { message: 'Server internal error, error unknown', status: 500 }
}
