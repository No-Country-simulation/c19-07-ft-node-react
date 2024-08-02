import { Meta } from ".";

export interface ParentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ParentData;
}

export interface ParentData {
  items: Parent[];
  meta: Meta;
}

interface Parent {
  parent_id: string;
  user_id: string;
  name: string;
  email: string;
  relation: string;
  createdAt: Date;
  updatedAt: Date;
}