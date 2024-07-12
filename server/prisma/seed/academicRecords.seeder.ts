import { PrismaClient } from '@prisma/client'

import { faker } from '@faker-js/faker'

interface IStudents {
  student_id: string
  grade: string
  section: string
  createdAt: Date
  updatedAt: Date
  parentId: string | null
  educational_level_id: string | null
}

interface ICourses {
  cursos_id: string
  nombre: string
  descripcion: string
  professor_id: string
  area_academica_id: string
}

interface IEvaluations {
  evaluation_id: string
  curso_id: string
  name: string
  description: string
  date: Date
}

const prisma = new PrismaClient()

const seedAcademicRecords = async (): Promise<void> => {
  const students: IStudents[] = await prisma.students.findMany()
  const courses: ICourses[] = await prisma.courses.findMany()
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  students.forEach(async (student: IStudents, i: number) => {
    const newData = await prisma.academic_records.create({
      data: {
        student_id: student.student_id,
        curso_id: courses[faker.number.int({ min: 0, max: courses.length - 1 })].cursos_id,
        mark: faker.number.float({ max: 100, min: 0, fractionDigits: 1 }),
        comment: faker.lorem.words({ min: 4, max: 10 }),
        date: new Date()
      }
    })
    console.log(newData)
  })
}

const seedEvaluations = async (): Promise<void> => {
  const courses: ICourses[] = await prisma.courses.findMany()
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  courses.forEach(async (c: ICourses) => {
    await prisma.evaluations.create({
      data: {
        curso_id: c.cursos_id,
        name: faker.person.jobType(),
        description: faker.lorem.words({ min: 4, max: 10 }),
        date: new Date()
      }
    })
  })
}

const seedEvaluationsResult = async (): Promise<void> => {
  const evaluations: IEvaluations[] = await prisma.evaluations.findMany()
  const students: IStudents[] = await prisma.students.findMany()
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  evaluations.forEach(async (e: IEvaluations, i: number) => {
    await prisma.evaluation_results.create({
      data: {
        evaluation_id: e.evaluation_id,
        student_id: students[faker.number.int({ min: 0, max: students.length - 1 })].student_id,
        mark: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
        comment: faker.lorem.words({ min: 4, max: 10 })
      }
    })
  })
}

// const seedCourses = async (): Promise<void> => {
//   const professors: IProfessors[] = await prisma.professors.findMany()
//   const academicAreas: IAcademicAreas[] = await prisma.academic_areas.findMany()
//   // eslint-disable-next-line @typescript-eslint/no-misused-promises
//   professors.forEach(async (profesor: IProfessors) => {
//     await prisma.courses.create({
//       data: {
//         nombre: faker.person.jobArea(),
//         descripcion: faker.lorem.words({ min: 4, max: 10 }),
//         professor_id: profesor.professor_id,
//         area_academica_id: academicAreas[faker.number.int({ min: 0, max: academicAreas.length - 1 })].area_academica_id
//       }
//     })
//   })
// }

export const mainAcademicRecords = async (): Promise<void> => {
  await seedAcademicRecords()
  await seedEvaluations()
  await seedEvaluationsResult()
}
