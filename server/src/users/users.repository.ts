// src/modules/students/repositories/student.repository.ts
import { PrismaClient, Users } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllUsersRepository = async (): Promise<Users[]> => {
  return await prisma.users.findMany()
}

export const createUserRepository = async (data: Omit<Users, 'user_id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Users> => {
  const user = await prisma.users.create({
    data: {
      ...data,
      state: 'ACTIVE' // Asegurando que el estado siempre se establezca a 'ACTIVE'
    }
  })

  return user
}

export const getUserRepository = async (id: string): Promise<Users | null> => {
  return await prisma.users.findUnique({ where: { user_id: id } })
}

export const updateUserRepository = async (id: string, data: Partial<Users>): Promise<Users> => {
  return await prisma.users.update({ where: { user_id: id }, data })
}

export const deleteUserRepository = async (id: string): Promise<Users> => {
  return await prisma.users.delete({ where: { user_id: id } })
}

export const getUserProfileByTypeUserRepository = async (id: string, typeUser: Users['type_user']): Promise<Users | null> => {
  const userProfile = await prisma.users.findFirst({
    where: { user_id: id, type_user: typeUser },
    include: {
      Parents: typeUser === 'PARENTS',
      Students: typeUser === 'STUDENT',
      Professors: typeUser === 'PROFESSOR'
    }
  })

  return userProfile
}
