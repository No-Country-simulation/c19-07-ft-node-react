// src/modules/students/services/student.service.ts
import { Academic_records, Educational_levels, PrismaClient, Students } from '@prisma/client'
import * as studentRepository from '../students/students.repository'
import { CreateStudent } from './schemas/student.schema'
import { UserRepository } from '../auth/repositories/user.repository'
import { ConflictError } from '../errors/conflictError'
import HTTP_STATUS from '../constants/statusCodeServer.const'
import { DatabaseError } from '../errors/databaseError'
import { LogicError } from '../errors/logicError'
import { AcademicRecordsWithName } from '../types/students.type'

export const getAllStudents = async (): Promise<Students[]> => {
  return await studentRepository.getAllStudents()
}

export const createStudent = async (data: CreateStudent): Promise<Students> => {
  const user = await new UserRepository(new PrismaClient()).findById(data.userId)
  if (user === null) throw new ConflictError('User not found', HTTP_STATUS.NOT_FOUND, { userId: 'is not valid' })
  if (user.type_user !== 'STUDENT') throw new ConflictError('User is not a student', 403, { userId: 'is not a student' })
  const newStudent = await studentRepository.createStudent(data)
  return newStudent
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

export const getCourseNameFromAcademicRecords = async (records: Academic_records[]): Promise<AcademicRecordsWithName[]> => {
  try {
    const academicRecordsWithCoursesNames: AcademicRecordsWithName[] = []
    for (const record of records) {
      const course = await studentRepository.getCoursesById(record.curso_id)
      const academicRecordWithCourseName = {
        ...record,
        name: course?.nombre
      }
      academicRecordsWithCoursesNames.push(academicRecordWithCourseName)
    }
    return await new Promise((resolve, reject) => {
      if (academicRecordsWithCoursesNames.length <= 0) throw new LogicError('Cant relation record with courses names')
      resolve(academicRecordsWithCoursesNames)
    })
  } catch (e: any) {
    if (e instanceof DatabaseError) throw new DatabaseError(e.message)
    throw new Error(e.message)
  }
}

export const studentsFromCourse = async (id: string): Promise<Students[]> => {
  return await studentRepository.getStudentsByCourse(id)
}

export const getStudentMarksByCourse = async (courseId: string, studentId: string): Promise<Academic_records[]> => {
  return await studentRepository.getAcademicRecordsByCourse(courseId, studentId)
}

export const getStudentEducationalLevel = async (id: string): Promise<Educational_levels | null> => {
  return await studentRepository.getStudentEducationalLevel(id)
}
