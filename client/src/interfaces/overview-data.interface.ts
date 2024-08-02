export interface OverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: OverviewData;
}

export interface OverviewData {
  infoStudent: InfoStudent;
  courses: Course[];
  overallAverageByPeriod: OverallAverageByPeriod[];
  evaluationsByPeriod: EvaluationsByPeriod[];
}

export interface Course {
  name: string;
}

export interface EvaluationsByPeriod {
  period: string;
  evaluations: Evaluation[];
}

export interface Evaluation {
  evaluationId: string;
  courseId: string;
  nameEvaluation: string;
  nameCourse: string;
  evaluationResult: EvaluationResult;
}

export interface EvaluationResult {
  mark: number;
  coment: string;
}

export interface InfoStudent {
  name: string;
  grade: string;
  section: string;
}

export interface OverallAverageByPeriod {
  period: string;
  average: number;
}
