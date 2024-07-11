export interface IApiRandomUser {
  results: Result[]
  info: Info
}

export interface Info {
  seed: string
  results: number
  page: number
  version: string
}

export interface Result {
  name: Name
  email: string
  login: Login
  picture: Picture
}

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface Name {
  title: Title
  first: string
  last: string
}

export enum Title {
  MS = 'Ms',
  Miss = 'Miss',
  Mr = 'Mr',
  Mrs = 'Mrs',
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

// user json

export interface IUserJSON {
  name: string
  password: string
  email: string
  state: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  type_user: 'PROFESSOR' | 'STUDENT' | 'PARENTS'
  studen_data?: StudentData
  parents_data?: ParentsData
}

export interface ParentsData {
  relation: string
}
export interface StudentData {
  grade: string
  section: string
}
