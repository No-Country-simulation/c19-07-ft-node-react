export interface CreateProfessor {
  academicAreaId: string
  hireDate: Date
  educationalLevelId: string
  employeeState: string
  userId: string
}
export interface CreateEvaluationAndResults {
  curso_id: string
  name: string
  description: string
  date: Date
  student_id: string
  mark: number
  comment: string
}

export type CreateEvaluations = Omit<CreateEvaluationAndResults, 'student_id' | 'mark' | 'comment' | 'curso_id'>

export type CreateEvaluationResult = Omit<CreateEvaluationAndResults, 'curso_id' | 'name' | 'description' | 'date' >
