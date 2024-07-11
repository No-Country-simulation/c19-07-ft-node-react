// src/modules/professors/repositories/professor.repository.ts
import { PrismaClient, Professors } from '@prisma/client'
import { log } from 'console'
const prisma = new PrismaClient(
  // {
  // log: ['query', 'info', 'warn', 'error'],
  // }
)

export const getAllProfessors = async (): Promise<Professors[]> => {
  return await prisma.professors.findMany()
}

export const createProfessor = async (data: Omit<Professors, 'professor_id' | 'createdAt' | 'updatedAt' |'estado_empleado'>): Promise<Professors> => {
  return await prisma.professors.create({
    data:  {
      ...data,
      estado_empleado: 'ACTIVE',  // valor predeterminado para estado_empleado
      createdAt: new Date(),      // valor predeterminado para createdAt
      updatedAt: new Date()       // valor predeterminado para updatedAt
    }
  
  })
}






export const getProfessorByIdRepository = async (id: string) => {
  console.log("000> ID recibido:",id);

  // const professor = await prisma.professors.findUnique({ 
  //   // where: { professor_id: id },
  //   where: {
  //     professor_id: id}
  // })
  // console.log("111>",professor);
  
  // return professor

  try {
    const professor = await prisma.professors.findUnique({
      where: { professor_id: id },
    });

    console.log("111> Profesor encontrado:", professor);
    return professor;
  } catch (error) {
    console.error("Error fetching professor:", error);
    throw new Error("Could not fetch professor");
  }
}

export const updateProfessor = async (id: string, data: Partial<Professors>): Promise<Professors> => {
  return await prisma.professors.update({ where: { professor_id: id }, data })
}

export const deleteProfessor = async (id: string): Promise<Professors> => {
  return await prisma.professors.delete({ where: { professor_id: id } })
}
