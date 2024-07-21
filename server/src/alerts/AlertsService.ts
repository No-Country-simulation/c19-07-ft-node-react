import { Alerts, PrismaClient } from '@prisma/client';
import * as alertRepository from './AlertRepository';

const prisma = new PrismaClient();

export const getAllAlerts = async (): Promise<Alerts[]> => {
  return await alertRepository.getAllAlerts();
};

export const createAlert = async (data: Omit<Alerts, 'alert_id'>): Promise<Alerts> => {
  return await alertRepository.createAlert(data);
};

export const getAlertById = async (id: string): Promise<Alerts | null> => {
  return await alertRepository.getAlertById(id);
};

export const updateAlert = async (id: string, data: Partial<Alerts>): Promise<Alerts> => {
  return await alertRepository.updateAlert(id, data);
};

export const deleteAlert = async (id: string): Promise<Alerts> => {
  return await alertRepository.deleteAlert(id);
};

export const getFeedback = async (studentId: string): Promise<Academic_records[]> => {
  return await alertRepository.getFeedback(studentId);
};
