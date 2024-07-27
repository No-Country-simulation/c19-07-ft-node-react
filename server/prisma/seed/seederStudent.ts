import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import fs from 'fs'

const prisma = new PrismaClient()

const main = async () => {
  const educationalLevels = await prisma.educational_levels.findMany({})
  const userTypeStudents = await prisma.users.findMany({
    where: { type_user: 'STUDENT' }
  })
  const parentsId = await prisma.parents.findMany({
    select: { parent_id: true }
  })

  const grades = ['1', '2', '3', '4', '5']
  const sections = ['A', 'B', 'C', 'D', 'E']

  const students = userTypeStudents.map((user, i) => {
    const grade = grades[i % grades.length]
    const section = sections[i % sections.length]

    return {
      grade,
      section,
      user_id: user.user_id,
      educational_level_id: educationalLevels[0].level_id,
      parentId: parentsId[i % parentsId.length].parent_id,
      feedback: faker.lorem.words(10)
    }
  })

  fs.writeFileSync('./prisma/seed/students.json', JSON.stringify(students, null, 2))

  const studentsDb = JSON.parse(
    fs.readFileSync('./prisma/seed/students.json', 'utf8')
  )
  await prisma.students.createMany({ data: studentsDb })
}

export default main
