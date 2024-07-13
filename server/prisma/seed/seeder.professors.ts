import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

// poblar area academica
const getUserAcademic = async () => {
  const academicArea = JSON.parse(fs.readFileSync('./prisma/seed/academicArea.json', 'utf8'))
  await prisma.academic_areas.createMany({ data: academicArea })
  const resolveAcademic = await prisma.academic_areas.findMany({})

  return resolveAcademic
}

// poblar area academica
const getEducationLevels = async () => {
  const resolveEducationLevels = await prisma.educational_levels.findMany({})
  return resolveEducationLevels
}

// poblar profesores
const getUserProfessor = async () => {
  const resolveprofessors = await prisma.users.findMany({ where: { type_user: 'PROFESSOR' } })
  console.log(resolveprofessors)
  return resolveprofessors
}

const main = async () => {
  const resolveMain = await getUserProfessor()

  const resolveAcademic = await getUserAcademic()
  console.log('000--->', resolveAcademic)

  const resolveEducationLevels = await getEducationLevels()

  console.log('111--->', resolveMain)

  const forMac = resolveMain.map((professor, index) => {
    return {
      // name: professor.name,
      user_id: professor.user_id,
      fecha_contratacion: new Date(),
      estado_empleado: 'ACTIVE',
      educational_level_id: resolveEducationLevels[index].level_id,
      area_academica_id: resolveAcademic[index].area_academica_id

    }
    // return dataa
  })
  console.log('222---formac>', forMac)
  return forMac
}

export default main
