// src/modules/professors/repositories/professor.repository.ts
import { PrismaClient, Parents } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllParent = async (): Promise<Parents[]> => {
  return await prisma.parents.findMany()
}

export const createParent = async (data: Omit<Parents, 'parent_id'>): Promise<Parents> => {
  return await prisma.parents.create({ data })
}

export const getParentById = async (id: string): Promise<Parents | null> => {
  return await prisma.parents.findUnique({ where: { parent_id: id } })
}

export const updateParent = async (id: string, data: Partial<Parents>): Promise<Parents> => {
  return await prisma.parents.update({ where: { parent_id: id }, data })
}

export const deleteParent = async (id: string): Promise<Parents> => {
  return await prisma.parents.delete({ where: { parent_id: id } })
}
