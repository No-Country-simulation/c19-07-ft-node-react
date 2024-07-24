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
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          console.error('prisma error:', { ...error, message: error.message })
          return new ResponseHandler(res).sendError(HTTP_STATUS.CONFLICT, 'Parent already exists')
        case 'P2003':
          console.error('prisma error:', { ...error, message: error.message })
          return new ResponseHandler(res).sendError(HTTP_STATUS.NOT_FOUND, 'User not found')
        default:
          console.error('prisma error:', { ...error, message: error.message })
          return new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'server error')
      }
    }
    if (error instanceof z.ZodError) {
      console.error('zod error:', { ...error, message: error.message })
      return new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', { msg: error.message })
    }
    console.error(error) // Log para ver el error
    next(error)
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


//rutas especificas:
//GET ALL
export const getStudentsWithDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await parentsService.getStudentsWithDetailsService()
    res.json(students)
  } catch (error) {
    console.error('Error getting student details:', error)
    res.status(500).json({ error: 'An error occurred while fetching student details' })
  }
}


//GET BY ID
export const getStudentByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const student = await parentsService.getStudentByIdService(id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json(student);
  } catch (error) {
    console.error('Error getting student details:', error);
    res.status(500).json({ error: 'An error occurred while fetching student details' });
  }
};
