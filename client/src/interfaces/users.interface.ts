import { Meta, User } from ".";

export interface UsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserData;
}

export interface UserData {
  items: User[];
  meta: Meta;
}