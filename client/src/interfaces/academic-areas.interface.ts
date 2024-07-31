import { Meta } from ".";

export interface AcademicAreasResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AcademicAreasData;
}

export interface AcademicAreasData {
  items: AcademicArea[];
  meta: Meta;
}

interface AcademicArea {
  academic_area_id: string;
  name: string;
  description: string;
  educational_level: string;
  createdAt: Date;
  updatedAt: Date;
}
