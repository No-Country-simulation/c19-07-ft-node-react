// src/modules/students/repositories/student.repository.ts
import { Academic_records, PrismaClient, Students } from '@prisma/client'
import { CreateStudent } from './schemas/student.schema'
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
      educational_level_id: data.educationalLevelId
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
