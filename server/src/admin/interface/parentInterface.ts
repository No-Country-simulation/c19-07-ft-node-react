export interface IParentListFormat {
  parent_id: string
  user_id: string
  name: string
  email: string
  relation: string
  createdAt: Date
  updatedAt: Date
}
export interface IParentFilter {
  name?: string
  email?: string
  viewDeleted?: 'only' | 'include' | 'none'
}
