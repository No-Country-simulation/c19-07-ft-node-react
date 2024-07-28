import { Parents } from '@prisma/client'
import * as parentRepository from '../parents/parents.repository'
import { CreateParents } from '../types/parents.type'
import z, { any } from 'zod'

export const getAllParents = async (): Promise<Parents[]> => {
  return await parentRepository.getAllParent()
}

export const createParents = async (data: Omit<Parents, 'updateAt' | 'parent_id'>): Promise<Parents> => {
  return await parentRepository.createParent(data)
}

export const getParentsById = async (id: string): Promise<Parents | null> => {
  return await parentRepository.getParentById(id)
}

export const updateParents = async (id: string, data: Partial<Parents>): Promise<Parents> => {
  return await parentRepository.updateParent(id, data)
}

export const deleteParents = async (id: string): Promise<Parents> => {
  return await parentRepository.deleteParent(id)
}

const createParentSchema = z.object({
  userId: z.string(),
  relation: z.string()
})

export const validateCreateParents = (object: CreateParents): boolean => {
  return createParentSchema.safeParse(object).success
}

export const validateUpdateParents = (object: Partial<CreateParents>): boolean => {
  return createParentSchema.safeParse(object).success
}

// RUTAS ESPECIFICAS:
interface StudentDetails {
  studentId: string
  studentName: string
  parentId: string | null
  parentName: string | null
  courses: Array<{
    courseId: string
    courseName: string
    professorId: string
    professorName: string
    academicAreaId: string
    academicAreaName: string
    academicRecords: Array<{
      recordId: string
      mark: number
      comment: string
      date: Date
    }>
    evaluations: Array<{
      evaluationId: string
      name: string
      description: string
      date: Date
      results: Array<{
        resultId: string
        studentId: string
        mark: number
        comment: string
      }>
    }>
  }>
}

// GET ALL
// export const getStudentsWithDetailsService = async (): Promise<StudentDetails[]> => {
//   const students = await parentRepository.getAllStudentsWithDetailsRepository()

//   const data2 = students.map((student: any) => ({
//     studentId: student.student_id,
//     studentName: student.user.name,
//     parentId: student.parent?.parent_id || null,
//     parentName: student.parent?.user.name || null,
//     courses: student.courses.map((course: any) => ({
//       courseId: course.cursos_id,
//       courseName: course.nombre,
//       professorId: course.professor_id,
//       professorName: course.professor.user.name,
//       academicAreaId: course.academic_area_id,
//       academicAreaName: course.academic_area.name,
//       academicRecords: course.academic_record
//         .filter((record: any) => record.student_id === student.student_id) // Filtra por student_id
//         .map((record: any) => ({
//           recordId: record.historial_id,
//           mark: record.mark,
//           comment: record.comment,
//           date: record.date
//         })),

//       evaluations: course.evaluations.map((evaluation: any) => ({
//         evaluationId: evaluation.evaluation_id,
//         name: evaluation.name,
//         description: evaluation.description,
//         date: evaluation.date,
//         results: evaluation.evaluation_result
//           .filter((result: any) => result.student_id === student.student_id) // Filtra por student_id
//           .map((result: any) => ({
//             resultId: result.result_id,
//             studentId: result.student_id,
//             mark: result.mark,
//             comment: result.comment
//           }))
//       }))
//     }))

//   }))

//   return data2
// }

export const getStudentsWithDetailsService = async (): Promise<StudentDetails[]> => {
  const students = await parentRepository.getAllStudentsWithDetailsRepository()

  const data2 = students.map((student: any) => ({
    studentId: student.student_id,
    studentName: student.user.name,
    parentId: student.parent?.parent_id || null,
    parentName: student.parent?.user.name || null,
    courses: student.courses.map((course: any) => {
      const academicRecords = course.academic_record
        .filter((record: any) => record.student_id === student.student_id)
        .map((record: any) => ({
          recordId: record.historial_id,
          mark: record.mark,
          comment: record.comment,
          date: record.date
        }))

      const marks = academicRecords.map((record: any) => record.mark).filter((mark: any) => mark !== undefined)
      const averageMark = marks.length > 0 ? marks.reduce((a: number, b: number) => a + b, 0) / marks.length : null

      return {
        courseId: course.cursos_id,
        courseName: course.nombre,
        professorId: course.professor_id,
        professorName: course.professor.user.name,
        academicAreaId: course.academic_area_id,
        academicAreaName: course.academic_area.name,
        academicRecords,
        evaluations: course.evaluations.map((evaluation: any) => ({
          evaluationId: evaluation.evaluation_id,
          name: evaluation.name,
          description: evaluation.description,
          date: evaluation.date,
          // results: evaluation.evaluation_result
          //   .filter((result: any) => result.student_id === student.student_id)
          //   .map((result: any) => ({
          //     resultId: result.result_id,
          //     studentId: result.student_id,
          //     mark: result.mark,
          //     comment: result.comment
          //   })),
          averageMark
        }))
      }
    })
  }))

  return data2
}

// GET BY ID
export const getStudentByIdService = async (id: string): Promise<StudentDetails | null> => {
  const student = await parentRepository.getStudentByIdRepository(id)
  if (student == null) return null

  return {
    studentId: student.student_id,
    studentName: student.user.name,
    parentId: student.parent?.parent_id || null,
    parentName: student.parent?.user.name || null,
    courses: student.courses.map((course: any) => ({
      courseId: course.cursos_id,
      courseName: course.nombre,
      professorId: course.professor_id,
      professorName: course.professor.user.name,
      academicAreaId: course.academic_area_id,
      academicAreaName: course.academic_area.name,
      academicRecords: course.academic_record
        .filter((record: any) => record.student_id === id) // Filtra por student_id
        .map((record: any) => ({
          recordId: record.historial_id,
          mark: record.mark,
          comment: record.comment,
          date: record.date
        })),
      evaluations: course.evaluations.map((evaluation: any) => ({
        evaluationId: evaluation.evaluation_id,
        name: evaluation.name,
        description: evaluation.description,
        date: evaluation.date,
        results: evaluation.evaluation_result
          .filter((result: any) => result.student_id === id) // Filtra por student_id
          .map((result: any) => ({
            resultId: result.result_id,
            studentId: result.student_id,
            mark: result.mark,
            comment: result.comment
          }))
      }))
    }))
  }
}

// GET all parents | nombreEstudiante|nombredelPadre|emaildelPadre

export const getStudentParentDetailsServices = async () => {
  const data = await parentRepository.getStudentParentDetailsRepository()

  return data
}
