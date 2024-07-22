import z from 'zod'
export const createStudentSchema = z.object({
  userId: z.string(),
  telephone: z.string(),
  age: z.number(),
  grade: z.string(),
  section: z.string(),
  parentId: z.string(),
  educationalLevelId: z.string()
})
export type CreateStudent = z.infer<typeof createStudentSchema>
