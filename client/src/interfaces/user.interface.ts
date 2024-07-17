export type Role = "ADMIN" | "STUDENT" | "PARENTS" | "PROFESSOR";

export interface User {
  user_id: string;
  name: string;
  email: string;
  type_user: Role;
  state: string;
}