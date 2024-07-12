import { Users } from '@prisma/client'

export interface IUserRepository {
  findByEmail: (email: string) => Promise<Users | null>

}
