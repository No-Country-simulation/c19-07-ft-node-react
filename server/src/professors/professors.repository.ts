/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/repositories/professor.repository.ts
import { Academic_records, Courses, Evaluation_results, Evaluations, PrismaClient, Professors } from '@prisma/client'
import { CreateAcademicRecord } from '../types/professors.type'
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

export const createAcademicRecord = async (date: string, data: Omit<CreateAcademicRecord, 'date'>): Promise<Academic_records> => {
  try {
    return await prisma.academic_records.create({
      data: {
        date: new Date(date),
        ...data
      }
    })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

export const getAcademicRecordsByCourseId = async (curso_id: string): Promise<Academic_records[]> => {
  try {
    return await prisma.academic_records.findMany({ where: { curso_id } })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
}

export const getAcademicRecords = async (historial_id: string): Promise<Academic_records[]> => {
  try {
    return await prisma.academic_records.findMany({ where: { historial_id } })
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
