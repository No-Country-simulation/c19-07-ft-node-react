// src/modules/professors/services/professor.service.ts
import { Professors } from '@prisma/client'

import * as professorRepository from '../professors/professors.repository'
import { CreateProfessor } from '../types/professors.type'
import z from 'zod'


export const getAllProfessors = async (): Promise<Professors[]> => {
  return await professorRepository.getAllProfessors()
}

export const createProfessor = async (data: Omit<Professors, 'professor_id' | 'createdAt' | 'updatedAt'|'estado_empleado'>): Promise<Professors> => {

  return await professorRepository.createProfessor(data)

}

export const getProfessorByIdService = async (id: string): Promise<Professors | null> => {
  // const professor = await getProfessorByIdRepository(id)
  // if(!professor) {
  //   throw new Error(`Student with id ${id} not found`)
  // }
  // console.log("enservicios",professor);
  
  // return professor
  return await getProfessorByIdRepository(id);


}

export const updateProfessor = async (id: string, data: Partial<Professors>): Promise<Professors> => {
  return await professorRepository.updateProfessor(id, data)
}

export const deleteProfessor = async (id: string): Promise<Professors> => {
  return await professorRepository.deleteProfessor(id)
}

const createProfessorSchema = z.object({
  academicAreaId: z.string(),
  hireData: z.date(),
  educationalLevelId: z.string(),
  employeeId: z.string(),
  userId: z.string()
})

export const validateUpdateProfessor = (object: Partial<CreateProfessor>): boolean => {
  return createProfessorSchema.safeParse(object).success
}

export const validateCreateProfessor = (object: CreateProfessor): boolean => {
  return createProfessorSchema.safeParse(object).success
}
