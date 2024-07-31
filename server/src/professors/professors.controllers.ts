/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import * as professorService from '../professors/professors.services'
import { Courses } from '@prisma/client'
import { getErrorMessageAndStatus } from '../utils/getErrorMessageAndStatus'
import { any } from 'zod'
import { ValidationError } from '../errors/validationError'

export const getAllProfessors = async (req: Request, res: Response): Promise<void> => {
  try {
    const professors = await professorService.getAllProfessors()
    res.json(professors)
  } catch (err: any) {
    const { status, message } = getErrorMessageAndStatus(err)
    res.status(status).send({ err: message, details: err.message })
  }
}

export const createProfessor = async (req: Request, res: Response): Promise<any> => {
  try {
    const isValid: boolean = professorService.validateCreateProfessor(req.body)
    if (!isValid) return res.status(400).send({ data: 'Invalid body request' })

    const { academicAreaId, hireDate, educationalLevelId, employeeState, userId } = req.body
    const professor = await professorService.createProfessor({
      user_id: userId,
      area_academica_id: academicAreaId,
      fecha_contratacion: hireDate,
      educational_level_id: educationalLevelId,
      estado_empleado: employeeState,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    res.json(professor)
  } catch (err: any) {
    const { status, message } = getErrorMessageAndStatus(err)
    res.status(status).send({ err: message, details: err.message })
  }
}

export const getProfessorById = async (req: Request, res: Response): Promise<any> => {
  try {
    const professor = await professorService.getProfessorById(req.params.id)
    if (professor == null) {
      return res.status(404).send({ err: 'Professor not found' })
    }
    res.status(200).send({ data: professor })
  } catch (err: any) {
    const { status, message } = getErrorMessageAndStatus(err)
    res.status(status).send({ err: message, details: err.message })
  }
}

export const updateProfessor = async (req: Request, res: Response): Promise<any> => {
  try {
    const isValid: boolean = professorService.validateUpdateProfessor(req.body)
    if (!isValid) return res.status(400).send({ data: 'Invalid body request' })

    const professor = await professorService.updateProfessor(req.params.id, req.body)
    res.json(professor)
  } catch (err: any) {
    const { status, message } = getErrorMessageAndStatus(err)
    res.status(status).send({ err: message, details: err.message })
  }
}

export const deleteProfessor = async (req: Request, res: Response): Promise<void> => {
  try {
    await professorService.deleteProfessor(req.params.id)
    res.status(204).send()
  } catch (err: any) {
    const { status, message } = getErrorMessageAndStatus(err)
    res.status(status).send({ err: message, details: err.message })
  }
}

export const createEvaluations = async (req: Request, res: Response): Promise<any> => {
  try {
    const isValidBody: boolean = professorService.validateCreateEvaluation(req.body)
    if (!isValidBody) return res.status(400).send({ err: 'Invalid body' })

    const { historial_id } = await professorService.createAcademicRecord(req.body)
    if (historial_id.length === 0) return res.status(503).send({ err: 'An error ocurred creating the evaluation' })

    res.status(204).send()
  } catch (e: any) {
    const { status, message } = getErrorMessageAndStatus(e)
    res.status(status).send({ err: message, error_details: e.message })
  }
}

export const getAcademicRecordsByCourseId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    if (id.length === 0) return res.status(400).send({ err: 'Invalid Id' })

    const evaluations = await professorService.getAcademicRecordsByCourseId(id)
    if (evaluations.length <= 0) return res.status(404).send({ err: 'No evaluations found' })

    res.status(200).send({ data: evaluations })
  } catch (e: any) {
    const { status, message } = getErrorMessageAndStatus(e)
    res.status(status).send({ err: message, error_details: e.message })
  }
}

export const getResultsFromOneAcademicRecord = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    if (id.length <= 0) res.status(400).send({ err: 'Invalid Id' })
    const results = await professorService.getAcademicRecords(id)
    if (results.length <= 0) return res.status(404).send({ err: 'No results found' })
    res.status(200).send({ data: results })
  } catch (err: any) {
    const { status, message } = getErrorMessageAndStatus(err)
    res.status(status).send({ err: message, error_details: err })
  }
}

export const getAssignedStudents = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    if (id.length <= 0) return res.status(404).send({ err: 'Invalid Id' })

    const courses: Courses[] = await professorService.getAssignedCourses(id)

    if (courses.length <= 0) return res.status(404).send({ err: 'This professor have not any assigned courses' })
    const coursesAndStudents = await professorService.studentsFromCourses(courses)

    res.status(200).send({ data: coursesAndStudents })
  } catch (err: any) {
    const { status, message } = getErrorMessageAndStatus(err)
    res.status(status).send({ err: message, error_details: err })
  }
}

export const updateAcademicRecordById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    if (!professorService.isValidId(id)) return res.status(400).send({ err: 'Invalid Id' })
    if (!professorService.isValidBody(req.body)) return res.status(400).send({ err: 'Invalid body' })

    await professorService.updateStudentEvaluations(id, req.body)
    res.status(204).send()
  } catch (err: any) {
    const { status, message } = getErrorMessageAndStatus(err)
    res.status(status).send({ err: message, error_details: err })
  }
}

// New
// New Routes for Report
export const getAllStudentsWithDetailsController = async (req: Request, res: Response) => {
  try {
    const data = await professorService.getAllStudentsWithDetailsService()
    res.status(200).json({ data })
    // if (students.length === 0) {
    //   return res.status(404).json({ err: 'Students  not found' });
    // }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getPeriodMarks = async (req: Request, res: Response): Promise<any> => {
  try {
    if (req.params.id === undefined || req.params.id === null) throw new ValidationError('Invalid user Id')
    professorService.validateQueryParameters(req.query)
    const studentId = req.params.id
    const courseId = req.query.courseId?.toString()
    const period = req.query.period?.toString()
    const academicRecords = await professorService.getAcademicRecordsByStudent(studentId)

    const course = await professorService.getCourseById(courseId!)

    const academicRecordsOfOneCourse = professorService.filterAcademicRecordsByCourse(courseId, academicRecords)

    const academicRecordsOfOnePeriod = professorService.getAcademicRecordsByPeriod(Number(period), academicRecordsOfOneCourse)

    const average = professorService.getAverageFromPeriod(academicRecordsOfOnePeriod)
    res.status(200).send({ data: { average, name: course?.nombre, comment: course?.descripcion } })
  } catch (e: any) {
    const { message, status } = getErrorMessageAndStatus(e)
    res.status(status).send({ message, err_details: e.message })
  }
}
