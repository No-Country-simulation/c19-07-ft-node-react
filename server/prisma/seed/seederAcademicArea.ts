import { PrismaClient } from '@prisma/client'
import fs from 'fs'
const prisma = new PrismaClient()
const readFileJson = () => {
  return JSON.parse(fs.readFileSync('./prisma/seed/academicArea.json', 'utf8'))
}
const transformAcademicArea = () => {
  const academicArea = readFileJson().map((academic: any) => {
    return {
      ...academic,
      name: academic.name.toUpperCase(),
      educational_level: academic.educational_level.toUpperCase()
    }
  })
  return academicArea
}
const main = async () => {
  const areaAcademic = transformAcademicArea()
  await prisma.academic_areas.createMany({ data: areaAcademic })
}

export default main
