import { PrismaClient } from "@prisma/client";
import fs from 'fs'
const prisma = new PrismaClient()
const main = async () => {
    const userTypeProfessors = await prisma.users.findMany({
        where: { type_user: 'PROFESSOR' }
      })
    
      const professors = userTypeProfessors.map((user) => {
        return {
          user_id: user.user_id
        }
      })
      fs.writeFileSync('./prisma/seed/professors.json', JSON.stringify(professors))
      const professorsDb = JSON.parse(
        fs.readFileSync('./prisma/seed/professors.json', 'utf8')
      )
      await prisma.professors.createMany({ data: professorsDb })
}
export default main