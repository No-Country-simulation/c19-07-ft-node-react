/*
import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

const createAreaAcademic = async () => {
  const academicArea = JSON.parse(fs.readFileSync('./prisma/seed/academicArea.json', 'utf8'))
  const transformAcademicArea = academicArea.map((academic: any) => {
    return {
      ...academic,
      name: academic.name.toUpperCase(),
      educational_level: academic.educational_level.toUpperCase()
    }
  })
  await prisma.academic_areas.createMany({ data: transformAcademicArea })
  const resolveAcademic = await prisma.academic_areas.findMany({})

  return resolveAcademic
}

const getEducationLevels = async () => {
  const resolveEducationLevels = await prisma.educational_levels.findMany({})
  return resolveEducationLevels
}

const getUserProfessor = async () => {
  const resolveprofessors = await prisma.users.findMany({ where: { type_user: 'PROFESSOR' } })
  console.log(resolveprofessors)
  return resolveprofessors
}

const main = async () => {
  const resolveMain = await getUserProfessor()
  const resolveAcademic = await createAreaAcademic()
  const resolveEducationLevels = await getEducationLevels()

  console.log('resolveAcademic:', resolveAcademic)
  console.log('resolveEducationLevels:', resolveEducationLevels)
  console.log('resolveMain:', resolveMain)

  const forMac = resolveMain.map((professor, index) => {
    const academic = resolveAcademic[index];
    const educationLevel = resolveEducationLevels[index];

    if (!academic) {
      console.error(`Academic area not found for index: ${index}`);
      return null; // O manejar de otra manera
    }

    if (!educationLevel) {
      console.error(`Education level not found for index: ${index}`);
      return null; // O manejar de otra manera
    }

    return {
      user_id: professor.user_id,
      fecha_contratacion: new Date(),
      estado_empleado: 'ACTIVE',
      educational_level_id: educationLevel.level_id,
      area_academica_id: academic.academic_area_id
    }
  }).filter(data => data !== null); // Filtrar valores nulos

  console.log('forMac:', forMac)
  // Aquí podrías agregar la lógica para crear los profesores en la base de datos
}

main().catch(e => {
  console.error(e)
  prisma.$disconnect()
})

export default main
 */

import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

const main = async () => {
  const userTypeProfessors = await prisma.users.findMany({
    where: { type_user: 'PROFESSOR' }
  })
  const areaAcademics = await prisma.academic_areas.findMany({})
  const educationalLevels = await prisma.educational_levels.findMany({})

  // Divide los profesores en dos grupos para los dos niveles educativos
  const half = Math.ceil(userTypeProfessors.length / 2)
  const professorsPrimary = userTypeProfessors.slice(0, half)
  const professorsSecondary = userTypeProfessors.slice(half)

  // Asignar profesores a niveles educativos y áreas académicas
  const professorsData = [...professorsPrimary, ...professorsSecondary].map(
    (professor, index) => {
      const educationalLevel =
        index < half ? educationalLevels[0] : educationalLevels[1] // Alternar niveles educativos
      const areaAcademica = areaAcademics[index % areaAcademics.length] // Asignar áreas académicas cíclicamente

      return {
        user_id: professor.user_id,
        fecha_contratacion: new Date().toISOString(),
        estado_empleado: 'ACTIVE',
        educational_level_id: educationalLevel.level_id,
        area_academica_id: areaAcademica.academic_area_id
      }
    }
  )
  fs.writeFileSync(
    './prisma/seed/professors.json',
    JSON.stringify(professorsData, null, 2),
    'utf-8'
  )
  // Insertar datos en la tabla Professors
  await prisma.professors.createMany({ data: professorsData })

  console.log('Profesores asignados exitosamente')
}

export default main
