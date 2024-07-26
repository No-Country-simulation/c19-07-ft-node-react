/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/services/professor.service.ts
import { Courses, Evaluation_results, Evaluations, Professors } from '@prisma/client'
import * as professorRepository from '../professors/professors.repository'
import { CreateEvaluationAndResults, CreateProfessor, StudentsAndCourse } from '../types/professors.type'
import z from 'zod'
import { studentsFromCourse } from '../students/students.services'
import { DatabaseError } from '../errors/databaseError'
import { LogicError } from '../errors/logicError'

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
      const courseAndStudents = {
        course,
        students
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




//New
//New Routes for Reports

export const getAllStudentsWithDetailsService = async () => {
  const data = await professorRepository.getAllStudentsWithDetailsRepository()

  // const data2 = data.map((student) => ({
  //     studentId: student.student_id,
  //     studentName: student.user.name,
  //     grade: student.grade,
  //     section: student.section,
  //     parentId: student.parent?.user.name,
  //     contact: {
  //       email: student.user.email,
  //       phone: student.telephone
  //     }
  //     ,
  //     courses: student.courses.map ((course: any) => ({
  //       courseId: course.cursos_id,
  //       courseName: course.nombre,
  //       professorId: course.professor.user_id,
  //       professorName: course.professor.user.name,
  //       academicAreaName: course.academic_area.name,
  //       academicRecords: course.academic_record
  //       .filter((record: any) => record.student_id === student.student_id) // Filtra por student_id
  //       .map((record: any) => ({
  //         recordId: record.historial_id,
  //         Comment: record.comment,
  //         date: record.date,
  //         mark: record.mark
  //       }))
  //       ,
  //       evaluaions: course.evaluations.map((evaluation: any) => ({
  //         evaluationId: evaluation.evaluation_id,
  //         name: evaluation.name,
  //         description: evaluation.description,
  //         date: evaluation.date,
  //         // results: evaluation.
  //       }))


  //     }))
  //   })
  // )

  const data2 = data.map((student) => ({
    studentId: student.student_id,
    studentName: student.user.name,
    grade: student.grade,
    section: student.section,
    parentId: student.parent?.user.name,
    contact: {
      email: student.user.email,
      phone: student.telephone
    },
    courses: student.courses.map(course => {
      const academicRecords = course.academic_record
        .filter(record => record.student_id === student.student_id) // Filtra por student_id
        .map(record => ({
        recordId: record.historial_id,
        comment: record.comment,
        date: record.date,
        mark: record.mark // Asegúrate de que este campo esté disponible y asignado correctamente
      }))

      const evaluations = course.evaluations.map(evaluation => {
        const marks = academicRecords.map(record => record.mark).filter(mark => mark !== undefined)
        const averageMark = marks.length > 0 ? marks.reduce((a, b) => a + b, 0) / marks.length : null

        return {
          evaluationId: evaluation.evaluation_id,
          name: evaluation.name,
          description: evaluation.description,
          date: evaluation.date,
          averageMark
        }
      })

      return {
        courseId: course.cursos_id,
        courseName: course.nombre,
        professorId: course.professor.user_id,
        professorName: course.professor.user.name,
        academicAreaName: course.academic_area.name,
        academicRecords,
        evaluations
      }
    })
  }))

  return data2
}