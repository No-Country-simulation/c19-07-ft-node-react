import { PrismaClient } from '@prisma/client'
import fs from 'fs'
const prisma = new PrismaClient()
const readFileJson = () => {
  return JSON.parse(
    fs.readFileSync('./prisma/seed/educationLevel.json', 'utf8')
  )
}
const main = async () => {
  const areaAcademic = readFileJson().map((academic: any) => {
    return {
      ...academic,
      name: academic.name.toUpperCase()
    }
  })
  await prisma.educational_levels.createMany({ data: areaAcademic })
}

export default main
