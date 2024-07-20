import { NextFunction, Request, Response } from 'express'
import * as parentsService from '../parents/parents.services'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ResponseHandler } from '../libs/response.lib'
import HTTP_STATUS from '../constants/statusCodeServer.const'
import { z } from 'zod'
export const getAllParents = async (req: Request, res: Response): Promise<void> => {
  try {
    const parents = await parentsService.getAllParents()
    res.json(parents)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const createParents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const isValid = parentsService.validateCreateParents(req.body)
    if (!isValid) throw Error('Invalid body')

    const { userId, relation } = req.body

    const parent = await parentsService.createParents({ user_id: userId, relation, createdAt: new Date(), updatedAt: new Date() })

    new ResponseHandler(res).sendResponse(HTTP_STATUS.CREATED, 'Parent created successfully', parent)
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      console.error('prisma error:', { ...err, message: err.message })
      return new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'server error')
    }
    if (err instanceof z.ZodError) {
      console.error('zod error:', { ...err, message: err.message })
      return new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', { msg: err.message })
    }
    console.error(err) // Log para ver el error
    next(err)
  }
}

export const getParentsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const parents = await parentsService.getParentsById(req.params.id)
    if (parents == null) res.status(404).send({ data: 'Parent not found' })

    res.json(parents)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const updateParents = async (req: Request, res: Response): Promise<void> => {
  try {
    const isValid = parentsService.validateCreateParents(req.body)
    if (!isValid) res.status(400).send({ data: 'Invalid body' })

    const parents = await parentsService.updateParents(req.params.id, req.body)
    res.json(parents)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const deleteParents = async (req: Request, res: Response): Promise<void> => {
  try {
    await parentsService.deleteParents(req.params.id)
    res.status(204).send()
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}
