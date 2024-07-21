/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/services/professor.service.ts
import { Courses, Evaluation_results, Evaluations, Professors } from '@prisma/client'
import * as professorRepository from '../professors/professors.repository'
import { CreateEvaluationAndResults, CreateProfessor, StudentsAndCourse } from '../types/professors.type'
import z from 'zod'
import { studentsFromCourse } from '../students/students.services'

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
  for (const course of courses) {
    const students = await studentsFromCourse(course.cursos_id)
    const courseAndStudents = {
      course,
      students
    }
    coursesAndStudents.push(courseAndStudents)
  }
  console.log('Courses and Students: ', coursesAndStudents)
  return await new Promise((resolve, reject) => {
    if (coursesAndStudents.length <= 0) reject(coursesAndStudents)
    resolve(coursesAndStudents)
  })
}
