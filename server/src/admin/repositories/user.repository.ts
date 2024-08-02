import { Prisma, PrismaClient, Users } from '@prisma/client'
import { IUserRepository } from './interface/user.interface'
import { CreateUserSchema, UpdateUserSchema } from '../schemas/user.schema'
import { IUserFilter } from '../interface/usertInterface'

export class UserRepository implements IUserRepository {
  constructor (private readonly prisma: PrismaClient) {}
  async createUser (
    data: CreateUserSchema
  ): Promise<Omit<Users, 'password' | 'deletedAt'>> {
    const user = await this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        type_user: data.typeUser,
        password: data.password
      },
      select: {
        name: true,
        type_user: true,
        user_id: true,
        email: true,
        state: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return user
  }

  async updateUser (
    userId: string,
    data: UpdateUserSchema
  ): Promise<Omit<Users, 'password' | 'deletedAt'>> {
    const user = await this.prisma.users.update({
      where: {
        user_id: userId
      },
      data: {
        name: data.name,
        email: data.email,
        type_user: data.typeUser
      },
      select: {
        name: true,
        type_user: true,
        user_id: true,
        email: true,
        state: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return user
  }

  async softDeleteUser (userId: string): Promise<Users> {
    const user = await this.prisma.users.update({
      where: {
        user_id: userId
      },
      data: {
        deletedAt: new Date()
      }
    })
    switch (user.type_user) {
      case 'PARENTS':
        await this.prisma.parents.update({
          where: {
            user_id: userId
          },
          data: {
            deletedAt: new Date()
          }
        })
        break
      case 'STUDENT':
        await this.prisma.students.update({
          where: {
            user_id: userId
          },
          data: {
            deletedAt: new Date()
          }
        })
        break
      case 'PROFESSOR':
        await this.prisma.professors.update({
          where: {
            user_id: userId
          },
          data: {
            deletedAt: new Date()
          }
        })
        break
    }
    return user
  }

  async restoreUser (userId: string): Promise<Users> {
    const user = await this.prisma.users.update({
      where: {
        user_id: userId
      },
      data: {
        deletedAt: null
      }
    })

    await this.prisma.parents.update({
      where: {
        user_id: userId
      },
      data: {
        deletedAt: null
      }
    })

    await this.prisma.students.update({
      where: {
        user_id: userId
      },
      data: {
        deletedAt: null
      }
    })

    await this.prisma.professors.update({
      where: {
        user_id: userId
      },
      data: {
        deletedAt: null
      }
    })
    return user
  }

  async findUserByName (name: string): Promise<Users[]> {
    const user = await this.prisma.users.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    })
    return user
  }

  async findUserById (userId: string): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        user_id: userId
      }
    })
    return user
  }

  async countAllusers (): Promise<number> {
    const count = await this.prisma.users.count()
    return count
  }

  async countFilteredUsers (filtros: IUserFilter): Promise<number> {
    const whereConditions: Prisma.UsersWhereInput = {}

    if (filtros?.name !== undefined) {
      whereConditions.name = {
        contains: filtros.name,
        mode: 'insensitive'
      }
    }

    if (filtros?.typeUser !== undefined) {
      whereConditions.type_user = filtros.typeUser
    }

    if (filtros?.viewDeleted === 'only') {
      whereConditions.deletedAt = { not: null }
    } else if (filtros?.viewDeleted !== 'include') {
      whereConditions.deletedAt = null
    }

    return await this.prisma.users.count({
      where: whereConditions
    })
  }

  async getAllUser (
    page: number,
    limit: number,
    filtros: IUserFilter
  ): Promise<Array<Omit<Users, 'password' | 'deletedAt'>>> {
    const whereConditions: Prisma.UsersWhereInput = {}
    if (filtros?.viewDeleted === 'only') {
      whereConditions.deletedAt = { not: null }
    } else if (filtros?.viewDeleted !== 'include') {
      whereConditions.deletedAt = null
    }

    if (filtros?.name !== undefined) {
      whereConditions.name = {
        contains: filtros.name,
        mode: 'insensitive'
      }
    }

    if (filtros?.typeUser !== undefined) {
      whereConditions.type_user = filtros.typeUser
    }

    const users = await this.prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereConditions,
      select: {
        user_id: true,
        name: true,
        email: true,
        type_user: true,
        state: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return users
  }

  async countActiveUsersByTypeUser (typeUSer: Users['type_user']): Promise<number> {
    const count = await this.prisma.users.count({
      where: {
        type_user: typeUSer,
        state: 'ACTIVE'
      }
    })
    return count
  }
}
