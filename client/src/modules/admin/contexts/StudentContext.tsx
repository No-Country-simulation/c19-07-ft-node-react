import { createContext, ReactNode, useEffect, useState } from "react";

import { Filter } from "../interfaces";
import { userMessage } from "../constants";
import { useAxiosPrivate } from "../../../hooks";
import { StatusRespMsg, ParentsResponse } from "../../../interfaces";

interface StudentContextProps {
  children: ReactNode;
}

export interface StudentContextValue {
  student: ParentsResponse | null;
  setStudent: React.Dispatch<React.SetStateAction<ParentsResponse | null>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  getStudents: () => Promise<void>;
  createStudent: (data: any) => Promise<StatusRespMsg>;
  deleteStudent: (id: string) => Promise<StatusRespMsg>;
  updateStudent: (id: string, data: any) => Promise<StatusRespMsg>;
}

export const StudentContext = createContext<StudentContextValue | undefined>(
  undefined
);

export const StudentProvider = ({ children }: StudentContextProps) => {
  const api = useAxiosPrivate();

  const [student, setStudent] = useState<ParentsResponse | null>(null);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    page: "1",
    limit: "10",
    typeUser: "",
  });

  const getStudents = async () => {
    const response = await api.get<ParentsResponse>(
      `/admin/parents?page=${filter.page}&limit=${filter.limit}&name=${filter.name}`
    );
    setStudent(response.data);
  };

  const createStudent = async (data: any): Promise<StatusRespMsg> => {
    try {
      const response = await api.post("/admin/create-parent", data);

      if (response.data.success) {
        await getStudents();

        return { ok: true, msg: userMessage.success.create };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const updateStudent = async (id: string, data: any): Promise<StatusRespMsg> => {
    try {
      const response = await api.put(`/admin/update-parent/${id}`, data);

      if (response.data.success) {
        await getStudents();

        return { ok: true, msg: userMessage.success.update };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const deleteStudent = async (id: string): Promise<StatusRespMsg> => {
    try {
      const response = await api.delete(`/admin/delete-parent/${id}`);

      if (response.data.success) {
        getStudents();

        return { ok: true, msg: userMessage.success.delete };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  useEffect(() => {
    getStudents();
  }, [filter]);

  return (
    <StudentContext.Provider
      value={{
        student,
        filter,
        setFilter,
        setStudent,
        getStudents,
        deleteStudent,
        createStudent,
        updateStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
