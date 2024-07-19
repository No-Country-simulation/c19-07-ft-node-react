// src/modules/students/services/student.service.ts
import { Academic_records, Students } from '@prisma/client'
import * as studentRepository from '../students/students.repository'

export const getAllStudents = async (): Promise<Students[]> => {
  return await studentRepository.getAllStudents()
}

export const createStudent = async (data: Omit<Students, 'student_id'>): Promise<Students> => {
  return await studentRepository.createStudent(data)
}

export const getStudentById = async (id: string): Promise<Students | null> => {
  return await studentRepository.getStudentById(id)
}

export const updateStudent = async (id: string, data: Partial<Students>): Promise<Students> => {
  return await studentRepository.updateStudent(id, data)
}

export const deleteStudent = async (id: string): Promise<Students> => {
  return await studentRepository.deleteStudent(id)
}

export const getFeedback = async (id: string): Promise<Academic_records[]> => {
  return await studentRepository.getAcademicRecords(id)
}
