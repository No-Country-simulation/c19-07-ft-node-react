/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/repositories/professor.repository.ts
import { Courses, Evaluation_results, Evaluations, PrismaClient, Professors } from '@prisma/client'
import { CreateEvaluationAndResults } from '../types/professors.type'
import { DatabaseError } from '../errors/databaseError'
const prisma = new PrismaClient()

export const getAllProfessors = async (): Promise<Professors[]> => {
  try {
    return await prisma.professors.findMany()
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

export const createProfessor = async (data: Omit<Professors, ('professor_id' | 'createdAt' | 'updateAt')>): Promise<Professors> => {
  try {
    return await prisma.professors.create({ data })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

export const getProfessorById = async (id: string): Promise<Professors | null> => {
  try {
    return await prisma.professors.findUnique({ where: { professor_id: id } })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

export const updateProfessor = async (id: string, data: Partial<Professors>): Promise<Professors> => {
  return await prisma.professors.update({ where: { professor_id: id }, data })
}

export const deleteProfessor = async (id: string): Promise<Professors> => {
  try {
    return await prisma.professors.delete({ where: { professor_id: id } })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

export const createEvaluation = async (curso_id: string, body: CreateEvaluationAndResults): Promise<Evaluations> => {
  try {
    return await prisma.evaluations.create({
      data: {
        curso_id,
        name: body.name,
        description: body.description,
        evaluation_result: {
          create: {
            student_id: body.student_id,
            mark: body.mark,
            comment: body.comment
          }
        }
      }
    })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

export const getEvaluationsById = async (curso_id: string): Promise<Evaluations[]> => {
  try {
    return await prisma.evaluations.findMany({ where: { curso_id } })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

export const getEvaluationsResults = async (evaluation_id: string): Promise<Evaluation_results[]> => {
  try {
    return await prisma.evaluation_results.findMany({ where: { evaluation_id } })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

export const getAssignedCourses = async (professor_id: string): Promise<Courses[]> => {
  return await prisma.courses.findMany({ where: { professor_id } })
}
