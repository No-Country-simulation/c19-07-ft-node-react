import { Parents } from '@prisma/client'

export interface IParentRepository {
  findParentByUserId: (userId: string) => Promise<Parents>
  getAllParents: (
    page: number,
    limit: number,
    filtro: IParentFilter
  ) => Promise<Parents[]>
  createParent: (data: any) => Promise<Parents>
}
export interface IParentFilter {
  name?: string
  email?: string
  viewDeleted?: 'only' | 'include' | 'none'
}
