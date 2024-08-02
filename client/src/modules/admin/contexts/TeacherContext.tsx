import { createContext, ReactNode, useEffect, useState } from "react";

import { Filter } from "../interfaces";
import { userMessage } from "../constants";
import { useAxiosPrivate } from "../../../hooks";
import { StatusRespMsg, ParentsResponse } from "../../../interfaces";

interface TeacherContextProps {
  children: ReactNode;
}

export interface TeacherContextValue {
  teacher: ParentsResponse | null;
  setTeacher: React.Dispatch<React.SetStateAction<ParentsResponse | null>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  getTeachers: () => Promise<void>;
  createTeacher: (data: any) => Promise<StatusRespMsg>;
  deleteTeacher: (id: string) => Promise<StatusRespMsg>;
  updateTeacher: (id: string, data: any) => Promise<StatusRespMsg>;
}

export const TeacherContext = createContext<TeacherContextValue | undefined>(
  undefined
);

export const TeacherProvider = ({ children }: TeacherContextProps) => {
  const api = useAxiosPrivate();

  const [teacher, setTeacher] = useState<ParentsResponse | null>(null);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    page: "1",
    limit: "10",
    typeUser: "",
  });

  const getTeachers = async () => {
    const response = await api.get<ParentsResponse>(
      `/admin/parents?page=${filter.page}&limit=${filter.limit}&name=${filter.name}`
    );
    setTeacher(response.data);
  };

  const createTeacher = async (data: any): Promise<StatusRespMsg> => {
    try {
      const response = await api.post("/admin/create-parent", data);

      if (response.data.success) {
        await getTeachers();

        return { ok: true, msg: userMessage.success.create };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const updateTeacher = async (
    id: string,
    data: any
  ): Promise<StatusRespMsg> => {
    try {
      const response = await api.put(`/admin/update-parent/${id}`, data);

      if (response.data.success) {
        await getTeachers();

        return { ok: true, msg: userMessage.success.update };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const deleteTeacher = async (id: string): Promise<StatusRespMsg> => {
    try {
      const response = await api.delete(`/admin/delete-parent/${id}`);

      if (response.data.success) {
        getTeachers();

        return { ok: true, msg: userMessage.success.delete };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  useEffect(() => {
    getTeachers();
  }, [filter]);

  return (
    <TeacherContext.Provider
      value={{
        teacher,
        filter,
        setTeacher,
        setFilter,
        getTeachers,
        deleteTeacher,
        createTeacher,
        updateTeacher,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
