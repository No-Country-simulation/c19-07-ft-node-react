/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/students/repositories/student.repository.ts
import { Academic_records, Courses, Educational_levels, PrismaClient, Students } from '@prisma/client'
import { CreateStudent } from './schemas/student.schema'
import { DatabaseError } from '../errors/databaseError'
const prisma = new PrismaClient()

export const getAllStudents = async (): Promise<Students[]> => {
  return await prisma.students.findMany()
}

export const createStudent = async (data: CreateStudent): Promise<Students> => {
  return await prisma.students.create({
    data: {
      user_id: data.userId,
      telephone: data.telephone,
      age: data.age,
      grade: data.grade,
      section: data.section,
      parentId: data.parentId,
      educational_level_id: data.educationalLevelId,
      feedback: ''
    }
  })
}

export const getStudentById = async (id: string): Promise<Students | null> => {
  return await prisma.students.findUnique({ where: { student_id: id } })
}

export const updateStudent = async (id: string, data: Partial<Students>): Promise<Students> => {
  return await prisma.students.update({ where: { student_id: id }, data })
}

export const deleteStudent = async (id: string): Promise<Students> => {
  return await prisma.students.delete({ where: { student_id: id } })
}

export const getAcademicRecords = async (id: string): Promise<Academic_records[]> => {
  return await prisma.academic_records.findMany({ where: { student_id: id } })
}

export const getStudentsByCourse = async (cursos_id: string): Promise<Students[]> => {
  try {
    return await prisma.students.findMany({
      where: {
        courses: {
          some: {
            cursos_id
          }
        }
      }
    })
  } catch (e: any) {
    throw new DatabaseError(e)
  }
}

export const getAcademicRecordsByCourse = async (curso_id: string, student_id: string): Promise<Academic_records[]> => {
  try {
    return await prisma.academic_records.findMany({ where: { curso_id, student_id } })
  } catch (e: any) {
    throw new DatabaseError(e)
  }
}

export const getStudentEducationalLevel = async (educational_level_id: string): Promise<Educational_levels | null> => {
  try {
    return await prisma.educational_levels.findFirst({ where: { level_id: educational_level_id } })
  } catch (e: any) {
    throw new DatabaseError(e)
  }
}

export const getCoursesById = async (cursos_id: string): Promise<Courses | null> => {
  try {
    return await prisma.courses.findFirst({ where: { cursos_id } })
  } catch (e: any) {
    throw new DatabaseError(e)
  }
}
