import { Parents } from '@prisma/client'
import * as parentRepository from '../parents/parents.repository'

export const getAllParents = async (): Promise<Parents[]> => {
  return await parentRepository.getAllParent()
}

export const createParents = async (data: Omit<Parents, 'parent_id'>): Promise<Parents> => {
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
