import { Users } from '@prisma/client'

export interface IUserFilter {
  name?: string
  typeUser?: Users['type_user']
  viewDeleted?: 'only' | 'include' | 'none'
}
