import { Academic_records } from '@prisma/client'

export interface AcademicRecordsWithName extends Omit<Academic_records, 'name'> {
  name: string | undefined
}
