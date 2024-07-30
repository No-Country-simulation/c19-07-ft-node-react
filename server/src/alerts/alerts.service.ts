import { Academic_records, Alerts } from '@prisma/client'
import { AlertRepository } from './alerts.repository'
import { z } from 'zod'
import { ValidationError } from '../errors/validationError'
// const prisma = new PrismaClient()
const alertRepository = new AlertRepository()
export const getAllAlerts = async (): Promise<Alerts[]> => {
  return await alertRepository.getAllAlerts()
}

export const createAlert = async (data: Omit<Alerts, 'alert_id'>): Promise<Alerts> => {
  return await alertRepository.createAlert(data)
}

export const getAlertById = async (id: string): Promise<Alerts | null> => {
  return await alertRepository.getAlertById(id)
}

export const updateAlert = async (id: string, data: Partial<Alerts>): Promise<Alerts> => {
  return await alertRepository.updateAlert(id, data)
}

export const deleteAlert = async (id: string): Promise<Alerts> => {
  return await alertRepository.deleteAlert(id)
}

export const getFeedback = async (studentId: string): Promise<Academic_records[]> => {
  return await alertRepository.getFeedback(studentId)
}

const alertsSchema = z.object({
  message: z.string(),
  date: z.string(),
  typeAlert: z.string(),
  parentId: z.string()
})

export const validateAlertBody = (data: Alerts): void => {
  const bodyValidation = alertsSchema.safeParse(data)
  if (bodyValidation.success) return
  throw new ValidationError(bodyValidation.error.message)
}
