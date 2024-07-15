import { Parents } from '@prisma/client'
import * as parentRepository from '../parents/parents.repository'
import { CreateParents } from '../types/parents.type'
import z from 'zod'

export const getAllParents = async (): Promise<Parents[]> => {
  return await parentRepository.getAllParent()
}

export const createParents = async (data: Omit<Parents, 'updateAt' | 'parent_id'>): Promise<Parents> => {
  return await parentRepository.createParent(data)
}

export const getParentsById = async (id: string): Promise<Parents | null> => {
  return await parentRepository.getParentById(id)
}

export const updateParents = async (id: string, data: Partial<Parents>): Promise<Parents> => {
  return await parentRepository.updateParent(id, data)
}

export const deleteParents = async (id: string): Promise<Parents> => {
  return await parentRepository.deleteParent(id)
}

const createParentSchema = z.object({
  userId: z.string(),
  relation: z.string()
})

export const validateCreateParents = (object: CreateParents): boolean => {
  return createParentSchema.safeParse(object).success
}

export const validateUpdateParents = (object: Partial<CreateParents>): boolean => {
  return createParentSchema.safeParse(object).success
}
