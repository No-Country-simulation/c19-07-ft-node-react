export interface IStudents {
  student_id: string
  grade: string
  section: string
  state: boolean
  createdAt: Date
  updatedAt: Date
  parentId: string | null
  educational_level_id: string | null
}
export interface ICourses {
  cursos_id: string
  nombre: string
  descripcion: string
  professor_id: string
  area_academica_id: string
}
export interface IEvaluations {
  evaluation_id: string
  curso_id: string
  name: string
  description: string
  date: Date
}
