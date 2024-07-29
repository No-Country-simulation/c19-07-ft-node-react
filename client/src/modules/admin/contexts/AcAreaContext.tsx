import { createContext, ReactNode, useEffect, useState } from "react";

import { Filter } from "../interfaces";
import { userMessage } from "../constants";
import { useAxiosPrivate } from "../../../hooks";
import { Message, ParentsResponse } from "../../../interfaces";

interface AcAreaContextProps {
  children: ReactNode;
}

export interface AcAreaContextValue {
  acArea: ParentsResponse | null;
  setAcArea: React.Dispatch<React.SetStateAction<ParentsResponse | null>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  getAcAreas: () => Promise<void>;
  createAcArea: (data: any) => Promise<Message>;
  deleteAcArea: (id: string) => Promise<Message>;
  updateAcArea: (id: string, data: any) => Promise<Message>;
}

export const AcAreaContext = createContext<AcAreaContextValue | undefined>(
  undefined
);

export const AcAreaProvider = ({ children }: AcAreaContextProps) => {
  const api = useAxiosPrivate();

  const [acArea, setAcArea] = useState<ParentsResponse | null>(null);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    page: "1",
    limit: "10",
    typeUser: "",
  });

  const getAcAreas = async () => {
    const response = await api.get<ParentsResponse>(
      `/admin/parents?page=${filter.page}&limit=${filter.limit}&name=${filter.name}`
    );
    setAcArea(response.data);
  };

  const createAcArea = async (data: any): Promise<Message> => {
    try {
      const response = await api.post("/admin/create-parent", data);

      if (response.data.success) {
        await getAcAreas();

        return { ok: true, msg: userMessage.success.create };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const updateAcArea = async (id: string, data: any): Promise<Message> => {
    try {
      const response = await api.put(`/admin/update-parent/${id}`, data);

      if (response.data.success) {
        await getAcAreas();

        return { ok: true, msg: userMessage.success.update };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const deleteAcArea = async (id: string): Promise<Message> => {
    try {
      const response = await api.delete(`/admin/delete-parent/${id}`);

      if (response.data.success) {
        getAcAreas();

        return { ok: true, msg: userMessage.success.delete };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  useEffect(() => {
    getAcAreas();
  }, [filter]);

  return (
    <AcAreaContext.Provider
      value={{
        acArea,
        filter,
        setFilter,
        setAcArea,
        getAcAreas,
        deleteAcArea,
        createAcArea,
        updateAcArea,
      }}
    >
      {children}
    </AcAreaContext.Provider>
  );
};
