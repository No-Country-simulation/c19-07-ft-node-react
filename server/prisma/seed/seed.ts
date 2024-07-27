/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { IApiRandomUser, IUserJSON } from './apiRandomUser.type'
import bcrypt from 'bcrypt'
import fs from 'fs'
import seederProfessors from './seeder.professors'
import seederCourses from './seeder.courses'
import seederAreaAcademic from './seederAcademicArea'
import { mainAcademicRecords } from './academicRecords.seeder'
import { faker } from '@faker-js/faker'
import studentRoutes from '../../src/students/students.routes'
import ramdonUsers from './api/apiRamdonUser'
import seederUsers from './seederUsers'
import seederEducationalLevel from './seederEducationalLevel'
import seederParents from './seederParents'
import seederStudents from './seederStudent'
const prisma = new PrismaClient()
export interface IUserDb {
  name: string
  password: string
  email: string
  type_user: 'PROFESSOR' | 'STUDENT' | 'PARENTS' | 'ADMIN'
  state: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
}
//

const main = async (): Promise<void> => {
  // recibe como parametro el total de usuarios q deseas tener en el sitema por default es 10
  // una vez cargado los usuarios comenta el siguiente bloque de codigo
  // solo descomentalo cada vez que quieras aumentar la cantidad de usaurios
  // --------------------------------------
  await ramdonUsers()
  // ---------------------------------------
  await seederAreaAcademic()
  await seederEducationalLevel()
  await seederUsers()
  await seederParents()
  await seederStudents()
  await seederProfessors()
  await seederCourses()
  await mainAcademicRecords()
  /* const professorsdb = */
  /*  fs.writeFileSync(
    './prisma/seed/professors.json',
    JSON.stringify(professorsdb)
  )

  const PROFESSOR = JSON.parse(
    fs.readFileSync('./prisma/seed/professors.json', 'utf8')
  )
  await prisma.professors.createMany({ data: PROFESSOR }) */

  /* fs.writeFileSync('./prisma/seed/courses.json', JSON.stringify(coursesDb))

  JSON.parse(fs.readFileSync('./prisma/seed/courses.json', 'utf8'))
  const createdStudents = await prisma.students.findMany()
  console.log(createdStudents[0])
  for (const course of coursesDb) {
    const result = await prisma.courses.create({
      data: {
        ...course,
        students: {
          connect: createdStudents
        }
      }
    })
    console.log('Courses created', result)
  } */
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
