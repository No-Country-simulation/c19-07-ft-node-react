// src/modules/professors/services/professor.service.ts
import { Professors } from '@prisma/client';
import * as professorRepository from '../professors/professors.repository';

export const getAllProfessors = async (): Promise<Professors[]> => {
  return await professorRepository.getAllProfessors();
};

export const createProfessor = async (data: Omit<Professors, 'professor_id'>): Promise<Professors> => {
  return await professorRepository.createProfessor(data);
};

export const getProfessorById = async (id: string): Promise<Professors | null> => {
  return await professorRepository.getProfessorById(id);
};

export const updateProfessor = async (id: string, data: Partial<Professors>): Promise<Professors> => {
  return await professorRepository.updateProfessor(id, data);
};

export const deleteProfessor = async (id: string): Promise<Professors> => {
  return await professorRepository.deleteProfessor(id);
};
