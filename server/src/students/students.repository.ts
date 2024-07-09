// src/modules/students/repositories/student.repository.ts
import { PrismaClient, Students } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllStudents = async (): Promise<Students[]> => {
  return await prisma.students.findMany()
}

export const createStudent = async (data: Omit<Students, 'student_id'>): Promise<Students> => {
  return await prisma.students.create({ data })
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
