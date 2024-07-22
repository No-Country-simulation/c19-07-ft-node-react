import { z } from 'zod'
export const formattedErrorsZod = (error: z.ZodError): Record<string, string> => {
  return error.errors.reduce((formattedErrors: Record<string, string>, err) => {
    const key = err.path.length > 0 ? err.path.join('.') : 'parameter'

    formattedErrors[key] = err.message

    return formattedErrors
  }, {})
}
