/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/repositories/professor.repository.ts
import { Academic_records, Courses, Evaluation_results, Evaluations, PrismaClient, Professors } from '@prisma/client'
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
  try {
    return await prisma.courses.findMany({ where: { professor_id } })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

// New
// New Routes for Reports
export const getAllStudentsWithDetailsRepository = async () => {
  const data = await prisma.students.findMany({
    include: {
      user: true,
      parent: {
        include: {
          user: true
        }
      },
      courses: {
        include: {
          academic_area: true,
          academic_record: {
            include: {
              student: true
            }
          },
          evaluations: true,
          professor: {
            include: {
              user: true
            }
          }
        }
      }
    }
  })

  return data
}

export const updateStudentEvaluations = async (historial_id: string, body: Partial<Omit<Academic_records, 'updatedAt' | 'deletedAt'>>): Promise<Academic_records> => {
  try {
    return await prisma.academic_records.update({ where: { historial_id }, data: { ...body } })
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new DatabaseError(`Error updating the student: ${err.message}`)
  }
}
