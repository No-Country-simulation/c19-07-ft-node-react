// src/modules/professors/repositories/professor.repository.ts
import { PrismaClient, Professors } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllProfessors = async (): Promise<Professors[]> => {
  return await prisma.professors.findMany();
};

export const createProfessor = async (data: Omit<Professors, 'professor_id'>): Promise<Professors> => {
  return await prisma.professors.create({ data });
};

export const getProfessorById = async (id: string): Promise<Professors | null> => {
  return await prisma.professors.findUnique({ where: { professor_id: id } });
};

export const updateProfessor = async (id: string, data: Partial<Professors>): Promise<Professors> => {
  return await prisma.professors.update({ where: { professor_id: id }, data });
};

export const deleteProfessor = async (id: string): Promise<Professors> => {
  return await prisma.professors.delete({ where: { professor_id: id } });
};
