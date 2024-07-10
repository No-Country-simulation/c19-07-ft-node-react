import { PrismaClient } from '@prisma/client'
import { IApiRandomUser, IUserJSON } from './apiRandomUser.type'
import fs from 'fs'

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
  const data = await prisma.educational_levels.findFirst({ where: { name: 'PRIMARY' } })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  users.forEach(async (user): Promise<void> => {
    const newUser = await prisma.users.create({
      data: {
        name: user.name,
        password: user.password,
        email: user.email,
        state: user.state,
        type_user: user.type_user
      }
    })

    if (newUser.type_user === 'PARENTS' && ((user.parents_data?.relation) != null) && data != null) {
      const newParents = await prisma.parents.create({
        data: {
          relation: user.parents_data.relation,
          user_id: newUser.user_id
        }
      })

      await prisma.students.create({
        data: {
          grade: '1',
          section: 'A',
          user_id: newUser.user_id,
          educational_level_id: data.level_id,
          parentId: newParents.parent_id
        }
      })
    }

    /*    if (newUser.type_user === 'STUDENT' && ((user.studen_data) != null) && data != null) {
         const parentsId = await prisma.parents.findMany({ select: { parent_id: true } })
         console.log('-->', parentsId)
         await prisma.students.create({
           data: {
             grade: user.studen_data.grade,
             section: user.studen_data.section,
             user_id: newUser.user_id,
             educational_level_id: data.level_id,
             parentId: parentsId[0].parent_id
           }
         })
       } */
  })
}
main().then(async () => {
  await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
