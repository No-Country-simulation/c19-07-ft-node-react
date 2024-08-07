// src/modules/professors/repositories/professor.repository.ts
import { PrismaClient, Parents, Students, Users, Courses, Professors } from '@prisma/client'
import { DatabaseError } from '../errors/databaseError'
const prisma = new PrismaClient()

// export const getAllParent = async (): Promise<Parents[]> => {
//   return await prisma.parents.findMany()
// }

export const getAllParent = async () => {
  return await prisma.parents.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true, 
        },
      },
    },
  })
}

export const createParent = async (data: Omit<Parents, 'parent_id' | 'deletedAt'>): Promise<Parents> => {
  return await prisma.parents.create({ data })
}

export const getParentById = async (id: string): Promise<Parents | null> => {
  try {
    return await prisma.parents.findUnique({ where: { parent_id: id } })
  } catch (e: any) {
    throw new DatabaseError(e.message)
  }
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
// ---------------------//---------------------//---------------------
// ---------------------//---------------------//---------------------

interface IStudentsWitchCourses extends Students {
  user: Users
  courses: IcourseWitchProfessor[]
}

interface IcourseWitchProfessor extends Courses {
  professor: IProfessorWitchUsers
}

interface IProfessorWitchUsers extends Professors {
  user: Users
}
export const getStudentsWitchDetails = async (studentId: string): Promise<IStudentsWitchCourses | null> => {
  // Obtener los datos del estudiante
  const studentWithCourses = await prisma.students.findUnique({
    where: {
      student_id: studentId
    },
    include: {
      user: true,
      courses: {
        include: {
          professor: {
            include: {
              user: true
            }
          }
        }
      }// Incluye la relaciÃ³n de los cursos
    }
  })

  return studentWithCourses
}
interface ItemplateData {
  student: {
    grade: string
    section: string
    studentId: string
    name: string
  }
  course: {
    courseId: string
    courseName: string
  }
  profesor: Array<{}>
}

// ---------------------//---------------------//---------------------
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


//get relation parent with student
 export const getRelationParentWithStudentRepository = async (id: string) => {
  //  const data = await prisma.students.findUnique({
  //    where: { student_id: studentId },
  //    include: {
  //      parent: true
  //    }
  //  })
   const data = await prisma.parents.findUnique({
    where: { parent_id: id },
    include: {
      user: {
        select: {
          name: true
        },
      },
      student: {
        select: {
          user: {
            select: {
              name: true,
              Students: {
                select: {
                  student_id: true
                }
              }
            },
          }
        }
      }
    }
  })

  if (data) {
    const { user_id, relation, createdAt, updatedAt, deletedAt, ...rest } = data;

    if (data.student && data.student.user && data.student.user.Students?.student_id) {
      const transformedData = {
        ...rest,
        student: {
          name: data.student.user.name,
          student_id: data.student.user.Students?.student_id
        }
      };

      return transformedData;
    }
    return {
      ...rest,
      user: data.user
    };
  }

   return null
 }