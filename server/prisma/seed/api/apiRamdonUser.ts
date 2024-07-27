import { IApiRandomUser } from '../apiRandomUser.type'
import bcrypt from 'bcrypt'
import fs from 'fs'

interface IUserDb {
  name: string
  password: string
  email: string
  type_user: 'PROFESSOR' | 'STUDENT' | 'PARENTS' | 'ADMIN'
  state: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
}

const getApiRandomUser = async (cant: number): Promise<IApiRandomUser['results']> => {
  const APIRANDOMUSER = `https://randomuser.me/api/?inc=name,login,picture,email&password=upper,lower,number,8&nat=es&results=${cant}`
  const response = await fetch(APIRANDOMUSER)
  const { results }: IApiRandomUser = await response.json()
  return results
}

const transformUser = async (
  users: IApiRandomUser['results']
): Promise<Array<Omit<IUserDb, 'type_user'>>> => {
  const usersDb: Array<Omit<IUserDb, 'type_user'>> = users.map(
    (user, index) => {
      return {
        name: `${user.name.first} ${user.name.last}`,
        password: user.login.password,
        email: `${index}${user.email}`,
        state: 'ACTIVE'
      }
    }
  )
  const usersDbWithTypeUser = await insertTypeUser(usersDb)
  await saveUsersToJsonFile(usersDbWithTypeUser)
  return usersDb
}

const insertTypeUser = async (
  users: Array<Omit<IUserDb, 'type_user'>>
): Promise<IUserDb[]> => {
  const porcentageProfessor = 0.2

  const totalUsers = users.length

  const totalStudents = Math.ceil((totalUsers * (1 - porcentageProfessor)) / 2)

  const totalParents = Math.floor((totalUsers * (1 - porcentageProfessor)) / 2)

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
const main = async (cant: number = 10) => {
  const ramdonUsers = await getApiRandomUser(cant)
  await transformUser(ramdonUsers)
}
export default main
