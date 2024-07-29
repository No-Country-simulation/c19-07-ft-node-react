// src/modules/students/services/student.service.ts
import { Users } from '@prisma/client'
// import * as getAllUsersRepository from './users.repository'
import * as getAllUsersRepository from '../users/users.repository'
import { AuthService } from '../auth/auth.service'
export const getAllUsersServices = async (): Promise<Users[]> => {
  return await getAllUsersRepository.getAllUsersRepository()
}

export const createUsersServices = async (data: Omit<Users, 'user_id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Users> => {
  const dataCreateUser = { ...data, password: AuthService.hashPassword(data.password) }
  const user = await getAllUsersRepository.createUserRepository(dataCreateUser)

  return user
}

export const getUserByIdServices = async (id: string): Promise<Users | null> => {
  return await getAllUsersRepository.getUserRepository(id)
}

export const updateUsersServices = async (id: string, data: Partial<Users>): Promise<Users> => {
  return await getAllUsersRepository.updateUserRepository(id, data)
}

export const deleteUsersServices = async (id: string): Promise<Users> => {
  return await getAllUsersRepository.deleteUserRepository(id)
}

export const getUserProfileByTypeUser = async (id: string, typeUser: Users['type_user']): Promise<Users | null> => {
  return await getAllUsersRepository.getUserProfileByTypeUserRepository(id, typeUser)
}
