import { Response as ExpressResponse } from 'express'

interface PaginationMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
  nextPage: string | null
  prevPage: string | null
}

export interface PaginatedResponse<T> {
  items: T[]
  meta: PaginationMeta
}

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

  static paginate<T>(
    items: T[],
    totalItems: number,
    page: number,
    limit: number,
    baseUrl: string
  ): PaginatedResponse<T> {
    const itemCount = items.length
    const totalPages = Math.ceil(totalItems / limit)
    const currentPage = page
    const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null
    const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null

    return {
      items,
      meta: {
        totalItems,
        itemCount,
        itemsPerPage: limit,
        totalPages,
        currentPage,
        nextPage,
        prevPage
      }
    }
  }
}
