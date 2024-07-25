export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  user_id: string;
  name: string;
  email: string;
  password: string;
  type_user: "ADMIN" | "STUDENT" | "PARENTS" | "PROFESSOR";
  state: string;
  createdAt: Date;
  updatedAt: Date;
  Students?: Student;
  Parents?: Parent;
  Professors?: Professor[];
}

export interface Student {
  student_id: string;
  user_id: string;
  telephone: null;
  age: null;
  grade: string;
  section: string;
  createdAt: Date;
  updatedAt: Date;
  parentId: string;
  educational_level_id: string;
}

export interface Parent {
  parent_id: string;
  user_id: string;
  relation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Professor {
  professor_id: string;
  user_id: string;
  area_academica_id: string;
  fecha_contratacion: Date;
  estado_empleado: string;
  educational_level_id: string;
  createdAt: Date;
  updatedAt: Date;
}
