import { Parents, Users } from '@prisma/client'
import { CreateParentSchema, UpdateParentSchema } from '../../schemas/parent.schema'
import { IParentFilter } from '../../interface/parentInterface'

export interface IParentRepository {
  findParentByUserId: (userId: string) => Promise<Parents | null>
  findParentByParentId: (parentId: string) => Promise<Parents | null>
  getAllParents: (
    page: number,
    limit: number,
    filtro: IParentFilter
  ) => Promise<Parents[]>
  createParent: (data: CreateParentSchema) => Promise<Parents>
  updateParent: (userId: string, data: UpdateParentSchema) => Promise<Parents>
  countFilteredParents: (filtros: IParentFilter) => Promise<number>
  getParentsNotAssociated: () => Promise<Users[]>
}
