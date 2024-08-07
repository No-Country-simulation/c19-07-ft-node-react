/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
// src/modules/professors/services/professor.service.ts
import { Academic_records, Courses, Professors, Students, Users } from '@prisma/client'
import * as professorRepository from '../professors/professors.repository'
import { CreateAcademicRecord, CreateProfessor, RecordsWithPeriod, StudentsAndCourse, StudentsWithData } from '../types/professors.type'
import z from 'zod'
import { getStudentEducationalLevel, getStudentMarksByCourse, studentsFromCourse } from '../students/students.services'
import { DatabaseError } from '../errors/databaseError'
import { LogicError } from '../errors/logicError'
import { getUserByIdServices } from '../users/users.services'
import { ValidationError } from '../errors/validationError'
import { ParsedQs } from 'qs'
import { NotFoundError } from '../errors/notFoundError'
import { PERIOD_ONE, PERIOD_THREE, PERIOD_TWO } from '../constants/date.const'
import { getParentById } from '../parents/parents.repository'

// export const getAllProfessors = async (): Promise<Professors[]> => {
//   return await professorRepository.getAllProfessors()
// }

export const getAllProfessors = async () => {
  const data = await professorRepository.getAllProfessors()

  return data.map(professor => ({
    professor_id: professor.professor_id,
    user_id: professor.user_id,
    name: professor.user.name,
    email: professor.user.email,
    academic_area_id: professor.area_academica_id,
    hiring_date: professor.fecha_contratacion,
    employed_state: professor.estado_empleado,
    education_level_id: professor.educational_level_id,
    createdAt: professor.createdAt,
    updatedAt: professor.updatedAt,
    deletedAt: professor.deletedAt,
  }))
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

export const getAcademicRecords = async (id: string | undefined): Promise<Academic_records[]> => {
  return await professorRepository.getAcademicRecords(id)
}

export const getAssignedCourses = async (id: string): Promise<Courses[]> => {
  return await professorRepository.getAssignedCourses(id)
}

export const studentsFromCourses = async (courses: Courses[]): Promise<StudentsAndCourse[] | undefined> => {
  const coursesAndStudents: StudentsAndCourse[] = []
  try {
    for (const course of courses) {
      const students = await studentsFromCourse(course.cursos_id)
      if (students.length <= 0) continue

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
    if (e instanceof LogicError) throw e
    throw new Error(e.message)
  }
}

const getStudentData = async (students: Students[], courseId: string): Promise<StudentsWithData[]> => {
  try {
    const studentsWithData: StudentsWithData[] = []
    for (const student of students) {
      const user: Users | null = await getUserByIdServices(student.user_id)
      if (user === null) throw new DatabaseError('User not found')

      const academicRecords = await getStudentAcademicRecords(courseId, student.student_id)

      if (academicRecords === undefined || academicRecords.length <= 0) continue
      const educationalLevel = await getStudentEducationalLevel(student.educational_level_id)
      const parentName = await getParentDataById(student.parentId)
      const studentWithData = {
        ...student,
        parentName,
        name: user?.name,
        educationalLevel: educationalLevel?.name,
        academicRecords
      }

      studentsWithData.push(studentWithData)
    }
    return await new Promise((resolve, reject) => {
      if (studentsWithData.length <= 0) throw new LogicError('Cannot relation students with users')
      resolve(studentsWithData)
    })
  } catch (e: any) {
    if (e instanceof LogicError) throw new LogicError(e.message)
    if (e instanceof DatabaseError) throw new DatabaseError(e.message)
    throw new Error(e.message)
  }
}

const getStudentAcademicRecords = async (courseId: string, studentId: string): Promise<RecordsWithPeriod[] | undefined> => {
  const records = await getStudentMarksByCourse(courseId, studentId)
  if (records.length <= 0) return
  const periodOne = new Date(PERIOD_ONE)
  const periodTwo = new Date(PERIOD_TWO)
  const periodThree = new Date(PERIOD_THREE)
  const recordsWithPeriod: RecordsWithPeriod[] = records.map(record => {
    if (record.date.getTime() >= periodOne.getTime() && record.date.getTime() < periodTwo.getTime()) return { ...record, period: 1 }
    if (record.date.getTime() >= periodTwo.getTime() && record.date.getTime() < periodThree.getTime()) return { ...record, period: 2 }
    return { ...record, period: 3 }
  })
  return recordsWithPeriod
}

const getParentDataById = async (parentId: string): Promise<string | undefined> => {
  const parentData = await getParentById(parentId)
  if (parentData === undefined) return
  const userParentData = await getUserByIdServices(parentData!!.user_id)
  return userParentData?.name
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

export const validateQueryParameters = (query: ParsedQs): void => {
  if (query.courseId === undefined || query.period === undefined) throw new ValidationError('Invalid query parameters')
}

export const filterAcademicRecordsByCourse = (courseId: undefined | string, academicRecords: Academic_records[]): Academic_records[] => {
  try {
    const filteredAcademicRecords = academicRecords.filter(academicRecord => academicRecord.curso_id === courseId)
    if (filteredAcademicRecords.length <= 0) throw new NotFoundError('Could not find any records for that course', 404)
    return filteredAcademicRecords
  } catch (e: any) {
    throw new LogicError(e.message)
  }
}

export const getAcademicRecordsByPeriod = (period: number, academicRecords: Academic_records[]): Academic_records[] => {
  try {
    const periodOne = new Date(PERIOD_ONE)
    const periodTwo = new Date(PERIOD_TWO)
    const periodThree = new Date(PERIOD_THREE)
    switch (period) {
      case 1:
        return academicRecords.filter(record => record.date.getTime() >= periodOne.getTime() && record.date.getTime() < periodTwo.getTime())
      case 2:
        return academicRecords.filter(record => record.date.getTime() >= periodTwo.getTime() && record.date.getTime() < periodThree.getTime())
      case 3:
        return academicRecords.filter(record => record.date.getTime() >= periodThree.getTime())
      default:
        throw new NotFoundError('Invalid period number', 404)
    }
  } catch (e: any) {
    throw new LogicError(e.message)
  }
}

export const getAverageFromPeriod = (academicRecords: Academic_records[]): number => {
  try {
    const total = academicRecords.reduce((record, nextRecord) => record + nextRecord.mark, 0)
    return total / academicRecords.length
  } catch (e: any) {
    throw new LogicError(e.message)
  }
}

export const getAcademicRecordsByStudent = async (id: string): Promise<Academic_records[]> => {
  return await professorRepository.getAcademicRecordsByStudent(id)
}

export const getCourseById = async (id: string): Promise<Courses | null> => {
  return await professorRepository.getCourseById(id)
}

export const deleteAcademicRecordById = async (id: string): Promise<Academic_records> => {
  return await professorRepository.deleteAcademicRecordById(id)
}
