export type Role = "ADMIN" | "STUDENT" | "PARENTS" | "PROFESSOR";

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User;
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  password: string;
  type_user: Role;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
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
  feedback: string;
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
