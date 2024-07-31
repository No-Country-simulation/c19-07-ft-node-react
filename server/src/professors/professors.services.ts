/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/services/professor.service.ts
import { Academic_records, Courses, Evaluation_results, Evaluations, Professors, Students, Users } from '@prisma/client'
import * as professorRepository from '../professors/professors.repository'
import { CreateAcademicRecord, CreateProfessor, StudentsAndCourse, StudentsWithData } from '../types/professors.type'
import z from 'zod'
import { getStudentEducationalLevel, getStudentMarksByCourse, studentsFromCourse } from '../students/students.services'
import { DatabaseError } from '../errors/databaseError'
import { LogicError } from '../errors/logicError'
import { getUserByIdServices } from '../users/users.services'

export const getAllProfessors = async (): Promise<Professors[]> => {
  return await professorRepository.getAllProfessors()
}

export const createProfessor = async (data: Omit<Professors, 'professor_id' | 'deletedAt'>): Promise<Professors> => {
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
  date: z.string(),
  student_id: z.string(),
  mark: z.number().min(1).max(100),
  comment: z.string(),
  curso_id: z.string()
})

export const validateCreateEvaluation = (object: CreateAcademicRecord): boolean => {
  return createEvaluationSchema.safeParse(object).success
}

export const createAcademicRecord = async (body: CreateAcademicRecord): Promise<Academic_records> => {
  return await professorRepository.createAcademicRecord(body.date, body)
}

export const getAcademicRecordsByCourseId = async (id: string): Promise<Academic_records[]> => {
  return await professorRepository.getAcademicRecordsByCourseId(id)
}

export const getAcademicRecords = async (id: string): Promise<Academic_records[]> => {
  return await professorRepository.getAcademicRecords(id)
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

// New
// New Routes for Reports

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
          mark: record.mark,
          name: record.name // Asegúrate de que este campo esté disponible y asignado correctamente
        }))

      // const evaluations = course.evaluations.map(evaluation => {
      //   const marks = academicRecords.map(record => record.mark).filter(mark => mark !== undefined)
      //   const averageMark = marks.length > 0 ? marks.reduce((a, b) => a + b, 0) / marks.length : null

      //   return {
      //     evaluationId: evaluation.evaluation_id,
      //     name: evaluation.name,
      //     description: evaluation.description,
      //     date: evaluation.date,
      //     averageMark
      //   }
      // })

      return {
        courseId: course.cursos_id,
        courseName: course.nombre,
        professorId: course.professor.user_id,
        professorName: course.professor.user.name,
        academicAreaName: course.academic_area.name,
        academicRecords
      }
    })
  }))

  return data2
}

const updateEvaluationObject = z.object({
  mark: z.optional(z.number()),
  comment: z.optional(z.string()),
  date: z.optional(z.string())
})

export const isValidId = (id: string): boolean => {
  return typeof id === 'string' && id.length > 0
}

export const isValidBody = (body: Partial<Academic_records>): boolean => {
  return updateEvaluationObject.safeParse(body).success
}

export const updateStudentEvaluations = async (id: string, body: Partial<Academic_records>): Promise<Academic_records> => {
  return await professorRepository.updateStudentEvaluations(id, body)
}
