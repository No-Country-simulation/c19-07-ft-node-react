/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Parents, Prisma, PrismaClient, Users } from '@prisma/client'
import { IParentRepository } from './interface/parent.interface'
import { CreateParentSchema, UpdateParentSchema } from '../schemas/parent.schema'
import { IParentFilter } from '../interface/parentInterface'

export class ParentRepository implements IParentRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async findParentByUserId (userId: string): Promise<Parents | null> {
    const parent = await this.prisma.parents.findFirst({
      where: {
        user_id: userId
      }
    })
    return parent
  }

  async findParentByParentId (parentId: string): Promise<Parents | null> {
    const parent = await this.prisma.parents.findFirst({
      where: {
        parent_id: parentId
      }
    })
    return parent
  }

  async getAllParents (page: number, limit: number, filtro: IParentFilter): Promise<IParentWithUser[]> {
    const whereConditions: Prisma.ParentsWhereInput = {}
    if (filtro?.viewDeleted === 'only') {
      whereConditions.deletedAt = { not: null }
    } else if (filtro?.viewDeleted !== 'include') {
      whereConditions.deletedAt = null
    }
    const userWhereConditions: Prisma.UsersWhereInput = {
      AND: [
        filtro.name ? { name: { contains: filtro.name, mode: 'insensitive' } } : {},
        filtro.email ? { email: { contains: filtro.email, mode: 'insensitive' } } : {}
      ]
    }

    const parents = await this.prisma.parents.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...whereConditions,
        user: {
          ...userWhereConditions
        }
      },
      include: {
        user: true // Para incluir los datos del usuario en la respuesta, si es necesario
      }
    })

    return parents
  }

  async createParent (data: CreateParentSchema): Promise<Parents> {
    const parent = await this.prisma.parents.create({
      data: {
        user_id: data.userId,
        relation: data.relation
      }
    })
    return parent
  }

  async updateParent (id: string, data: UpdateParentSchema): Promise<Parents> {
    const parent = await this.prisma.parents.update({
      where: { parent_id: id },
      data
    })
    return parent
  }

  async countFilteredParents (filtros: IParentFilter): Promise<number> {
    const whereConditions: Prisma.ParentsWhereInput = {}
    if (filtros?.viewDeleted === 'only') {
      whereConditions.deletedAt = { not: null }
    } else if (filtros?.viewDeleted !== 'include') {
      whereConditions.deletedAt = null
    }
    const userWhereConditions: Prisma.UsersWhereInput = {
      AND: [
        filtros.name ? { name: { contains: filtros.name, mode: 'insensitive' } } : {},
        filtros.email ? { email: { contains: filtros.email, mode: 'insensitive' } } : {}
      ]
    }
    const count = await this.prisma.parents.count({
      where: {
        ...whereConditions,
        user: {
          ...userWhereConditions
        }
      }
    })

    return count
  }

  async getParentsNotAssociated (): Promise<Users[]> {
    const parents = await this.prisma.parents.findMany({})
    const parentIds = parents.map((parent) => parent.user_id)
    const users = await this.prisma.users.findMany({
      where: {
        type_user: 'PARENTS',
        user_id: { notIn: parentIds }
      }
    })
    return users
  }
}

export interface IParentWithUser extends Parents {
  user: Users
}
