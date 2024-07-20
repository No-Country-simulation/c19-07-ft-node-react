/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import * as professorService from '../professors/professors.services'

export const getAllProfessors = async (req: Request, res: Response): Promise<void> => {
  try {
    const professors = await professorService.getAllProfessors()
    res.json(professors)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const createProfessor = async (req: Request, res: Response): Promise<void> => {
  try {
    const isValid: boolean = professorService.validateCreateProfessor(req.body)
    if (!isValid) res.status(400).send({ data: 'Invalid body request' })

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
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const getProfessorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const professor = await professorService.getProfessorById(req.params.id)
    if (professor == null) res.status(404).send({ error: 'Professor not found' })
    res.status(200).send({ data: professor })
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const updateProfessor = async (req: Request, res: Response): Promise<void> => {
  try {
    const isValid: boolean = professorService.validateUpdateProfessor(req.body)
    if (!isValid) res.status(400).send({ data: 'Invalid body request' })

    const professor = await professorService.updateProfessor(req.params.id, req.body)
    res.json(professor)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const deleteProfessor = async (req: Request, res: Response): Promise<void> => {
  try {
    await professorService.deleteProfessor(req.params.id)
    res.status(204).send()
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const createEvaluations = async (req: Request, res: Response): Promise<void> => {
  try {
    const isValid: boolean = professorService.validateCreateEvaluation(req.body)
    if (!isValid) res.send(400).send({ err: 'Invalid body' })
    const { id } = req.params
    if (typeof id !== typeof '') res.send(400).send({ err: 'Invalid curso_id' })

    const { evaluation_id } = await professorService.createEvaluation(id, req.body)
    if (evaluation_id.length === 0) res.send(500).send({ error: 'An error ocurred creating the evaluation' })

    res.status(204).send()
  } catch (e: any) {
    res.status(500).send({ err: 'Server error', error_details: e })
  }
}

export const getEvaluationsByCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (id.length === 0) res.status(400).send({ error: 'Invalid Id' })
    const evaluations = await professorService.getEvaluationsById(id)
    if (evaluations.length <= 0) res.status(404).send({ data: 'No evaluations found' })
    res.status(200).send({ data: evaluations })
  } catch (e: any) {
    res.status(500).send({ err: 'Server error', error_details: e })
  }
}

export const getResultsFromOneEvaluation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (id.length <= 0) res.status(400).send({ error: 'Invalid Id' })
    console.log(id)
    const results = await professorService.getEvaluationsResults(id)
    if (results.length <= 0) {
      console.log(results)
      res.status(404).send({ data: 'No results found' })
      return
    }
    res.status(200).send({ data: results })
  } catch (e: any) {
    res.status(500).send({ err: 'Server error', error_details: e })
  }
}
