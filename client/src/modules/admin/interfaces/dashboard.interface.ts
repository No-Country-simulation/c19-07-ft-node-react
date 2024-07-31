export interface DashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DashboardData;
}

export interface DashboardData {
  overallAverage: number;
  activeStudents: number;
  numberOfTeachers: number;
  numberofUsers: number;
  topStudents: TopStudent[];
}

export interface TopStudent {
  student_id: string;
  name: string;
  grade: string;
  section: string;
  averageMark: string;
}
