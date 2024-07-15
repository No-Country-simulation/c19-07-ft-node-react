type Role = "ADMIN" | "STUDENT" | "PARENT" | "PROFESSOR";

export interface User {
  userId: string;
  email: string;
  role: Role;
  state: string;
}