import { Academic_records } from '@prisma/client'

export interface AcademicRecordsWithName extends Academic_records {
  name: string | undefined
}
