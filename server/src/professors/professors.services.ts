/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/services/professor.service.ts
import { Evaluation_results, Evaluations, Professors } from '@prisma/client'
import * as professorRepository from '../professors/professors.repository'
import { CreateEvaluationAndResults, CreateEvaluationResult, CreateEvaluations, CreateProfessor } from '../types/professors.type'
import z from 'zod'

export const getAllProfessors = async (): Promise<Professors[]> => {
  return await professorRepository.getAllProfessors()
}

export const createProfessor = async (data: Omit<Professors, 'professor_id'>): Promise<Professors> => {
  return await professorRepository.createProfessor(data)
}

export const getProfessorById = async (id: string): Promise<Professors | null> => {
  return await professorRepository.getProfessorById(id)
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

const createEvaluationSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.date(),
  student_id: z.string(),
  mark: z.number().min(1).max(100),
  comment: z.string()
})

export const validateCreateEvaluation = (object: CreateEvaluationAndResults): boolean => {
  return createEvaluationSchema.safeParse(object).success
}

export const createEvaluation = async (curso_id: string, body: CreateEvaluations): Promise<Evaluations> => {
  return await professorRepository.createEvaluation(curso_id, body)
}

export const createEvaluationResult = async (evaluation_id: string, body: CreateEvaluationResult): Promise<Evaluation_results> => {
  return await professorRepository.createEvaluationResult(evaluation_id, body)
}
