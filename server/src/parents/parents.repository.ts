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

// Rutas especificas:
// GET ALL
export const getAllStudentsWithDetailsRepository = async () => {
  const data = await prisma.students.findMany({

    include: {
      user: true,
      parent: {
        include: {
          user: true
        }
      },
      courses: {
        include: {
          academic_area: true,
          professor: {
            include: {
              user: true
            }
          },
          academic_record: true,
          evaluations: {
            include: {
              evaluation_result: true
            }
          }
        }
      }
    }

  })

  return data
}

// GET BY ID
// repositorio
export const getStudentByIdRepository = async (id: string) => {
  const data = await prisma.students.findUnique({
    where: { student_id: id },
    include: {
      user: true,
      parent: { include: { user: true } },
      courses: {
        include: {
          academic_area: true,
          academic_record: {
            include: {
              student: true
            }
          },
          evaluations: {
            include: {
              evaluation_result: {
                include: {
                  student: true
                }
              }
            }
          },
          professor: { include: { user: true } } // Incluye la información del profesor aquí
        }
      }
    }
  })
  return data
}

// GET all parents | nombreEstudiante|nombredelPadre|emaildelPadre
// repositorio

export const getStudentParentDetailsRepository = async (): Promise<Array<{ studentName: string, parentName: string, parentEmail: string }>> => {
  const students = await prisma.students.findMany({
    select: {
      user: {
        select: {
          name: true
        }
      },
      parent: {
        select: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }
    }
  })

  const data = students.map(student => ({
    studentName: student.user.name,
    parentName: student.parent?.user.name || '',
    parentEmail: student.parent?.user.email || ''

  }))

  return data
}
