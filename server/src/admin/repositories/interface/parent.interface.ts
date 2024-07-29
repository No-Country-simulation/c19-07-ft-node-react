import { Parents } from '@prisma/client'
import { CreateParentSchema, DeleteParentSchema } from '../../schemas/parent.schema'

export interface IParentRepository {
  findParentByUserId: (userId: string) => Promise<Parents | null>
  getAllParents: (
    page: number,
    limit: number,
    filtro: IParentFilter
  ) => Promise<Parents[]>
  createParent: (data: CreateParentSchema) => Promise<Parents>
  countFilteredParents: (filtros: IParentFilter) => Promise<number>
  deleteParent: (data: DeleteParentSchema) => Promise<Parents>
}
export interface IParentFilter {
  name?: string
  email?: string
  viewDeleted?: 'only' | 'include' | 'none'
}
