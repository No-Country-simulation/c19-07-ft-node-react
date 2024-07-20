/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/repositories/professor.repository.ts
import { Evaluation_results, Evaluations, PrismaClient, Professors } from '@prisma/client'
import { CreateEvaluationAndResults } from '../types/professors.type'
const prisma = new PrismaClient()

export const getAllProfessors = async (): Promise<Professors[]> => {
  return await prisma.professors.findMany()
}

export const createProfessor = async (data: Omit<Professors, ('professor_id' | 'createdAt' | 'updateAt')>): Promise<Professors> => {
  return await prisma.professors.create({ data })
}

export const getProfessorById = async (id: string): Promise<Professors | null> => {
  return await prisma.professors.findUnique({ where: { professor_id: id } })
}

export const updateProfessor = async (id: string, data: Partial<Professors>): Promise<Professors> => {
  return await prisma.professors.update({ where: { professor_id: id }, data })
}

export const deleteProfessor = async (id: string): Promise<Professors> => {
  return await prisma.professors.delete({ where: { professor_id: id } })
}

export const createEvaluation = async (curso_id: string, body: CreateEvaluationAndResults): Promise<Evaluations> => {
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
}

