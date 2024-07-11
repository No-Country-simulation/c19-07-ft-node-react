import { PrismaClient } from '@prisma/client'
import { IApiRandomUser, IUserJSON } from './apiRandomUser.type'
import bcrypt from 'bcrypt-ts'
import fs from 'fs'
import seederProfessors from './seeder.professors'
import seederCourses from './seeder.courses'

import { mainAcademicRecords } from './academicRecords.seeder'

const prisma = new PrismaClient()
const APIRANDOMUSER = 'https://randomuser.me/api/?inc=name,login,picture,email&password=upper,lower,number,8&nat=es&results=5'
interface IUserDb {
  name: string
  password: string
  email: string
  type_user: 'PROFESSOR' | 'STUDENT' | 'PARENTS'
  state: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
}
const getApiRandomUser = async (): Promise<IApiRandomUser['results']> => {
  const response = await fetch(APIRANDOMUSER)
  const { results }: IApiRandomUser = await response.json()
  return results
}

const transformUser = async (users: IApiRandomUser['results']): Promise<Array<Omit<IUserDb, 'type_user'>>> => {
  const usersDb: Array<Omit<IUserDb, 'type_user'>> = users.map((user) => {
    return {
      name: `${user.name.first} ${user.name.last}`,
      password: user.login.password,
      email: user.email,
      state: 'ACTIVE'
    }
  })
  const usersDbWithTypeUser = await insertTypeUser(usersDb)
  await saveUsersToJsonFile(usersDbWithTypeUser)
  return usersDb
}

const insertTypeUser = async (users: Array<Omit<IUserDb, 'type_user'>>): Promise<IUserDb[]> => {
  const porcentageProfessor = 0.2

  const totalUsers = users.length

  const totalStudents = Math.ceil(totalUsers * (1 - porcentageProfessor) / 2)

  const totalParents = Math.floor(totalUsers * (1 - porcentageProfessor) / 2)

  const usersDb: IUserDb[] = users.map((user, index) => {
    if (index < totalStudents) {
      return { ...user, type_user: 'STUDENT' }
    }
    if (index < totalStudents + totalParents) {
      return { ...user, type_user: 'PARENTS' }
    }
    return { ...user, type_user: 'PROFESSOR' }
  })

  return usersDb
}
const saveUsersToJsonFile = async (users: IUserDb[]): Promise<void> => {
  fs.writeFileSync('./prisma/seed/users.json', JSON.stringify(users))
}

const main = async (): Promise<void> => {
  // const usersRandom = await getApiRandomUser()
  // await transformUser(usersRandom)
  const users: IUserJSON[] = JSON.parse(fs.readFileSync('./prisma/seed/users.json', 'utf8'))

  const educationLevel = JSON.parse(fs.readFileSync('./prisma/seed/educationLevel.json', 'utf8'))

  await prisma.educational_levels.createMany({ data: educationLevel })

  // eslint-disable-next-line @typescript-eslint/no-misused-promises

  for (let i = 0; i < users.length; i++) {
    await prisma.users.create({
      data: {
        name: users[i].name,
        password: users[i].password,
        email: users[i].email,
        state: users[i].state,
        type_user: users[i].type_user
      }
    })
  }

  const userTypeParents = await prisma.users.findMany({ where: { type_user: 'PARENTS' } })
  const userTypeStudents = await prisma.users.findMany({ where: { type_user: 'STUDENT' } })
  const educationalLevels = await prisma.educational_levels.findMany({})
  const parents = userTypeParents.map((user) => {
    return {
      relation: 'FATHER',
      user_id: user.user_id
    }
  })
  fs.writeFileSync('./prisma/seed/parents.json', JSON.stringify(parents))
  const parentsDb = JSON.parse(fs.readFileSync('./prisma/seed/parents.json', 'utf8'))
  await prisma.parents.createMany({ data: parentsDb })
  const parentsId = await prisma.parents.findMany({ select: { parent_id: true } })
  const students = userTypeStudents.map((user, i) => {
    return {
      grade: '1',
      section: 'A',
      user_id: user.user_id,
      educational_level_id: educationalLevels[0].level_id,
      parentId: parentsId[i].parent_id
    }
  })

  fs.writeFileSync('./prisma/seed/students.json', JSON.stringify(students))

  const studentsDb = JSON.parse(fs.readFileSync('./prisma/seed/students.json', 'utf8'))

  await prisma.students.createMany({ data: studentsDb })
  console.log('-->', { userTypeParents, userTypeStudents })
  const professorsdb = await seederProfessors()

  fs.writeFileSync('./prisma/seed/professors.json', JSON.stringify(professorsdb))

  const PROFESSOR = JSON.parse(fs.readFileSync('./prisma/seed/professors.json', 'utf8'))
  await prisma.professors.createMany({ data: PROFESSOR })

  const coursesDb = await seederCourses()
  fs.writeFileSync('./prisma/seed/courses.json', JSON.stringify(coursesDb))

  const COURSES = JSON.parse(fs.readFileSync('./prisma/seed/courses.json', 'utf8'))
  await prisma.courses.createMany({ data: COURSES })


  await mainAcademicRecords()
}
main().then(async () => {
  await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
