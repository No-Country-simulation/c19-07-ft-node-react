// src/modules/students/controllers/student.controller.ts
import { NextFunction, Request, Response } from 'express'
import * as studentService from '../students/students.services'
import { Academic_records } from '@prisma/client'
import { ResponseHandler } from '../libs/response.lib'
import HTTP_STATUS from '../constants/statusCodeServer.const'
import { CreateStudent, createStudentSchema } from './schemas/student.schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { z } from 'zod'
import { formattedErrorsZod } from '../libs/formatedErrorsZod'
import { CustomError } from '../errors/customError'
import { getErrorMessageAndStatus } from '../utils/getErrorMessageAndStatus'
export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await studentService.getAllStudents()
    res.json(students)
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: CreateStudent = createStudentSchema.parse(req.body)

    const student = await studentService.createStudent(data)
    new ResponseHandler(res).sendResponse(HTTP_STATUS.CREATED, 'Student created successfully', student)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = formattedErrorsZod(error)
      return new ResponseHandler(res).sendError(HTTP_STATUS.BAD_REQUEST, 'Validation error', errors)
    }
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('prisma error:', { ...error, message: error.message })
      return new ResponseHandler(res).sendError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'server error')
    }
    if (error instanceof CustomError && error.name === 'ConflictError') {
      console.error('-->', error)
      return new ResponseHandler(res).sendError(error.statusCode, error.message)
    }
    next(error)
  }
}

export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await studentService.getStudentById(String(req.params.id))
    if (student != null) {
      res.json(student)
    } else {
      res.status(404).send('Student not found')
    }
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await studentService.updateStudent(String(req.params.id), req.body)
    res.json(student)
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    await studentService.deleteStudent(String(req.params.id))
    res.status(204).send()
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const getAcademicRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(typeof (req.params.id))
    if (!(typeof (req.params.id) === 'string')) res.status(400).send({ error: 'Invalid id' })

    const { id } = req.params
    const academicRecords: Academic_records[] = await studentService.getFeedback(id)
    const academicRecordsWithCourseName = await studentService.getCourseNameFromAcademicRecords(academicRecords)

    if (academicRecords.length === 0) res.status(204).send({ data: 'User dont have any academic record' })
    res.status(200).send({ data: academicRecordsWithCourseName })
  } catch (e: any) {
    const { status, message } = getErrorMessageAndStatus(e)
    res.status(status).send({ err: message, err_details: e })
  }
}
