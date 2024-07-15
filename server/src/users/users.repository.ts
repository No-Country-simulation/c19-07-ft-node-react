// src/modules/students/repositories/student.repository.ts
import { PrismaClient, Users } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllUsersRepository = async (): Promise<Users[]> => {
  return await prisma.users.findMany()
}

export const createUserRepository = async (data: Omit<Users, 'user_id' | 'createdAt' | 'updatedAt'>): Promise<Users> => {
  try {
    const user = await prisma.users.create({
      data: {
        ...data,
        state: 'ACTIVE' // Asegurando que el estado siempre se establezca a 'ACTIVE'
      }
    })

    return user
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`)
  }
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
