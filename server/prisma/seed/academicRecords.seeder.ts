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

const seedAcademicRecords = async () => {
  const students: IStudents[] = await prisma.students.findMany()
  const courses: ICourses[] = await prisma.courses.findMany()
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  students.forEach(async (student: IStudents, i: number) => {
    await prisma.academic_records.create({
      data: {
        student_id: student.student_id,
        curso_id: courses[i].cursos_id,
        mark: faker.number.float({ max: 100, min: 100, fractionDigits: 1 }),
        comment: faker.lorem.words({ min: 4, max: 10 }),
        date: new Date()
      }
    })
  })
}

const seedEvaluations = async () => {
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

const seedEvaluationsResult = async () => {
  const evaluations: IEvaluations[] = await prisma.evaluations.findMany()
  const students: IStudents[] = await prisma.students.findMany()
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  evaluations.forEach(async (e: IEvaluations, i: number) => {
    await prisma.evaluation_results.create({
      data: {
        evaluation_id: e.evaluation_id,
        student_id: students[i].student_id,
        mark: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
        comment: faker.lorem.words({ min: 4, max: 10 })
      }
    })
  })
}
