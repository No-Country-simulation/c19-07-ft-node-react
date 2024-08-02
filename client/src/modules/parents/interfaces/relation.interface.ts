export interface RelationResponse {
  parent_id: string;
  user: User;
  student: Student;
}

interface Student {
  name: string;
  student_id: string;
}

interface User {
  name: string;
}
