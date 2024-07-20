// src/modules/students/services/student.service.ts
import { Users } from '@prisma/client'
// import * as getAllUsersRepository from './users.repository'
import * as getAllUsersRepository from '../users/users.repository'

export const getAllUsersServices = async (): Promise<Users[]> => {
  return await getAllUsersRepository.getAllUsersRepository()
}

export const createUsersServices = async (data: Omit<Users, 'user_id' | 'createdAt' | 'updatedAt'>): Promise<Users> => {
  const user = await getAllUsersRepository.createUserRepository(data)

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
