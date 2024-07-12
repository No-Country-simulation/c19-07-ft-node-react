import { Request, Response } from 'express'
import * as professorService from '../professors/professors.services'
import {getProfessorByIdService} from './professors.services'
import {getProfessorByIdRepository} from './professors.repository'
import { Professors } from '@prisma/client'

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
    if (isValid) res.status(400).send({ data: 'Invalid body request' })

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

export const getProfessorByIdController = async (req: Request, res: Response):Promise<Response> => {
  // const { id } = req.params;
  // try {
  //   const professor = await getProfessorByIdService(id)
  //   console.log("encontrollers",professor)
  //   res.status(200).json(professor)
  // } catch (err: any) {
  //   console.error(err) 
  //   res.status(404).json({ error: 'Server Error', details: err.message })
  // }
    //  const professor = await professorService.getProfessorById({professor_id: id})
    //  return professor

    const { id } = req.params;

    try {
      const professor = await getProfessorByIdService(id);
      console.log(professor);
      
      if (!professor) {
        return res.status(404).json({ error: `Professor with id ${id} not found` });
      }
      return res.status(200).json(professor);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });


    }
}

export const updateProfessor = async (req: Request, res: Response): Promise<void> => {
  try {
    const isValid: boolean = professorService.validateUpdateProfessor(req.body)
    if (isValid) res.status(400).send({ data: 'Invalid body request' })

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
