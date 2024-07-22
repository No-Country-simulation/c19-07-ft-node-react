import { Academic_areas } from '@prisma/client'

export interface IAcademicAreaRepository {
  createAcademicArea: (data: Omit<Academic_areas, 'academic_area_id' | 'createdAt' | 'updatedAt'>) => Promise<Academic_areas>
  getAcademicAreas: (page: number, limit: number) => Promise<Academic_areas[]>
  getAcademicAreaById: (academicAreaId: string) => Promise<Academic_areas | null>
  deleteAcademicAreaById: (academicAreaId: string) => Promise<Academic_areas>
  updateAcademicAreaById: (data: Omit<Academic_areas, 'academic_area_id' | 'createdAt' | 'updatedAt'>, academicAreaId: string) => Promise<Academic_areas>
  findByNameAndEducationalLevel: (name: string, educationalLevel: string) => Promise<Academic_areas | null>
  countAcademicAreas: () => Promise<number>
}
