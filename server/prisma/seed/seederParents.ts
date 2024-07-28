import { PrismaClient } from '@prisma/client'
import fs from 'fs'
const prisma = new PrismaClient()
const main = async () => {
  const userTypeParents = await prisma.users.findMany({
    where: { type_user: 'PARENTS' }
  })

  const parents = userTypeParents.map((user) => {
    return {
      relation: 'FATHER',
      user_id: user.user_id
    }
  })
  fs.writeFileSync('./prisma/seed/parents.json', JSON.stringify(parents))
  const parentsDb = JSON.parse(
    fs.readFileSync('./prisma/seed/parents.json', 'utf8')
  )
  await prisma.parents.createMany({ data: parentsDb })
}
export default main
