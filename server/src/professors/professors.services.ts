/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/services/professor.service.ts
import { Courses, Evaluation_results, Evaluations, Professors, Students, Users } from '@prisma/client'
import * as professorRepository from '../professors/professors.repository'
import { CreateEvaluationAndResults, CreateProfessor, StudentsAndCourse, StudentsWithData } from '../types/professors.type'
import z from 'zod'
import { getStudentEducationalLevel, getStudentMarksByCourse, studentsFromCourse } from '../students/students.services'
import { DatabaseError } from '../errors/databaseError'
import { LogicError } from '../errors/logicError'
import { getUserByIdServices } from '../users/users.services'

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
  date: z.string(),
  student_id: z.string(),
  mark: z.number().min(1).max(100),
  comment: z.string()
})

export const validateCreateEvaluation = (object: CreateEvaluationAndResults): boolean => {
  return createEvaluationSchema.safeParse(object).success
}

export const createEvaluation = async (curso_id: string, body: CreateEvaluationAndResults): Promise<Evaluations> => {
  return await professorRepository.createEvaluation(curso_id, body)
}

export const getEvaluationsById = async (id: string): Promise<Evaluations[]> => {
  return await professorRepository.getEvaluationsById(id)
}

export const getEvaluationsResults = async (id: string): Promise<Evaluation_results[]> => {
  return await professorRepository.getEvaluationsResults(id)
}

export const getAssignedCourses = async (id: string): Promise<Courses[]> => {
  return await professorRepository.getAssignedCourses(id)
}

export const studentsFromCourses = async (courses: Courses[]): Promise<StudentsAndCourse[]> => {
  const coursesAndStudents: StudentsAndCourse[] = []
  try {
    for (const course of courses) {
      const students = await studentsFromCourse(course.cursos_id)
      const studentsWithData = await getStudentData(students, course.cursos_id)
      const courseAndStudents = {
        course,
        students: studentsWithData
      }
      coursesAndStudents.push(courseAndStudents)
    }

    return await new Promise((resolve, reject) => {
      if (coursesAndStudents.length <= 0) throw new LogicError('Cannot relation students to courses')
      resolve(coursesAndStudents)
    })
  } catch (e: any) {
    if (e instanceof DatabaseError) throw e
    throw new Error(e.message)
  }
}

const getStudentData = async (students: Students[], courseId: string): Promise<StudentsWithData[]> => {
  try {
    const studentsWithData: StudentsWithData[] = []
    for (const student of students) {
      const user: Users | null = await getUserByIdServices(student.user_id)
      if (user === null) throw new DatabaseError('User not found')

      const mark = await getStudentMark(courseId, student.student_id)
      if (typeof mark !== 'number') throw new LogicError('Error cannot calculate mark for student')

      const educationalLevel = await getStudentEducationalLevel(student.educational_level_id)
      const studentWithData = {
        ...student,
        name: user?.name,
        mark,
        educationalLevel: educationalLevel?.name
      }

      studentsWithData.push(studentWithData)
    }
    return await new Promise((resolve, reject) => {
      if (studentsWithData.length <= 0) throw new LogicError('Cannot relation students with users')
      resolve(studentsWithData)
    })
  } catch (e: any) {
    if (e instanceof LogicError) throw new LogicError(e.message)
    throw new DatabaseError(e.message)
  }
}

const getStudentMark = async (courseId: string, studentId: string): Promise<number> => {
  try {
    const records = await getStudentMarksByCourse(courseId, studentId)
    if (records.length <= 0) throw new DatabaseError('Marks not found')
    const sumMarks = records.reduce((total, record) => total + record.mark, 0)
    return sumMarks / records.length
  } catch (e: any) {
    throw new DatabaseError(e)
  }
}
