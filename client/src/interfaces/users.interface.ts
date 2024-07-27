import { User } from ".";

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

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  nextPage: null | string;
  prevPage: null | string;
}
