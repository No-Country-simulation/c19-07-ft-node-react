/* import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// //poblar area academica
// const getUserAcademic = async () => {
//     const academicArea = JSON.parse(fs.readFileSync('./prisma/seed/academicArea.json', 'utf8'))
//     await prisma.academic_areas.createMany({ data: academicArea })
//     const resolveAcademic = await prisma.academic_areas.findMany({})

//     return resolveAcademic;
// }

// //poblar area academica
// const getEducationLevels = async () => {
//     const resolveEducationLevels = await prisma.educational_levels.findMany({})
//     return resolveEducationLevels;
// }

// //poblar profesores
// const getUserProfessor = async () => {
//     const resolveprofessors = await prisma.users.findMany({ where: { type_user: 'PROFESSOR' } })
//     console.log(resolveprofessors)
//     return resolveprofessors;
// }
const getProfessors = async () => {
  // const academicAreas = await prisma.academic_areas.findMany({ select: { area_academica_id: true,nombre: true,descripcion: true } })
  return await prisma.professors.findMany({ select: { professor_id: true } })

  // {
  // await prisma.professors.findMany({ select: { professor_id: true } })
  //  professors
  //  , academicAreas
  // }
}
const getAcademicAreas = async () => {
  return await prisma.academic_areas.findMany({ select: { academic_area_id: true, name: true, description: true } })
}

 const generateCourses = async () => {
   const { professors, academicAreas } = await getProfessorsAndAcademicAreas()
   const academicAreasJson = JSON.parse(fs.readFileSync('./prisma/seed/academicArea.json', 'utf8'))

  console.log("000---formac>",academicAreasJson)
   const courses = academicAreasJson.map((area: any, index: number) => {     return {
       nombre: academicAreas[index % academicAreas.length].nombre,       descripcion: academicAreas[index % academicAreas.length].descripcion,
       professor_id: professors[index % professors.length].professor_id,
       area_academica_id: academicAreas[index % academicAreas.length].area_academica_id
    }
   })

   fs.writeFileSync('./prisma/seed/courses.json', JSON.stringify(courses))
  console.log("Courses generated and saved to courses.json")
  console.log("111---formac>",courses)
  return courses
 }

const main = async (): Promise<Array<{
  nombre: string
  descripcion: string
  professor_id: string
  area_academica_id: string
}>> => {
    const resolveCourse = await generateCourses()
  const resolveGetProfessors = await getProfessors()
  console.log('3333--->', resolveGetProfessors)

  const resolvegetAcademicAreas = await getAcademicAreas()
  console.log('4444--->', resolvegetAcademicAreas)
  const forCourses = resolveGetProfessors.map((course, index) => {
    return {
      nombre: resolvegetAcademicAreas[index].name,
      descripcion: resolvegetAcademicAreas[index].description,
      professor_id: course.professor_id,
      area_academica_id: resolvegetAcademicAreas[index].academic_area_id
    }
  })

  console.log('5555---formac>', forCourses)

  return forCourses
}

export default main
 */

import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

const main = async () => {
  // Obtener los profesores
  const professors = await prisma.professors.findMany({})
  // Obtener las áreas académicas
  const academicAreas = await prisma.academic_areas.findMany({})

  // Verificar si hay profesores y áreas académicas
  if (professors.length === 0) {
    console.error('No hay profesores disponibles.')
    return
  }
  if (academicAreas.length === 0) {
    console.error('No hay áreas académicas disponibles.')
    return
  }

  // Crear cursos
  const coursesData = professors.map((professor, index) => {
    const academicArea = academicAreas[index % academicAreas.length]

    return {
      nombre: `Curso ${index + 1}`,
      descripcion: `Descripción del curso ${index + 1}`,
      professor_id: professor.professor_id,
      area_academica_id: academicArea.academic_area_id
    }
  })

 
  

  // Guardar cursos en un archivo JSON
  fs.writeFileSync('./prisma/seed/courses.json', JSON.stringify(coursesData, null, 2))

  JSON.parse(fs.readFileSync('./prisma/seed/courses.json', 'utf8'))
  const createdStudents = await prisma.students.findMany()
  console.log(createdStudents[0])
  for (const course of coursesData) {
    const result = await prisma.courses.create({
      data: {
        ...course,
        students: {
          connect: createdStudents
        }
      }
    })
    console.log('Courses created', result)
  console.log('Cursos creados y guardados en courses.json')
}
}
export default main
