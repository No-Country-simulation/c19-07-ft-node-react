import { createContext, ReactNode, useEffect, useState } from "react";

import { Filter } from "../interfaces";
import { userMessage } from "../constants";
import { useAxiosPrivate } from "../../../hooks";
import { Message, ParentsResponse } from "../../../interfaces";

interface ParentContextProps {
  children: ReactNode;
}

export interface ParentContextValue {
  parent: ParentsResponse | null;
  setParent: React.Dispatch<React.SetStateAction<ParentsResponse | null>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  getParents: () => Promise<void>;
  createParent: (data: any) => Promise<Message>;
  deleteParent: (id: string) => Promise<Message>;
  updateParent: (id: string, data: any) => Promise<Message>;
}

export const ParentContext = createContext<ParentContextValue | undefined>(
  undefined
);

export const ParentProvider = ({ children }: ParentContextProps) => {
  const api = useAxiosPrivate();

  const [parent, setParent] = useState<ParentsResponse | null>(null);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    page: "1",
    limit: "10",
    typeUser: "",
  });

  const getParents = async () => {
    const response = await api.get<ParentsResponse>(
      `/admin/parents?page=${filter.page}&limit=${filter.limit}&name=${filter.name}`
    );
    setParent(response.data);
  };

  const createParent = async (data: any): Promise<Message> => {
    try {
      const response = await api.post("/admin/create-parent", data);

      if (response.data.success) {
        await getParents();

        return { ok: true, msg: userMessage.success.create };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const updateParent = async (id: string, data: any): Promise<Message> => {
    try {
      const response = await api.put(`/admin/update-parent/${id}`, data);

      if (response.data.success) {
        await getParents();

        return { ok: true, msg: userMessage.success.update };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const deleteParent = async (id: string): Promise<Message> => {
    try {
      const response = await api.delete(`/admin/delete-parent/${id}`);

      if (response.data.success) {
        getParents();

        return { ok: true, msg: userMessage.success.delete };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  useEffect(() => {
    getParents();
  }, [filter]);

  return (
    <ParentContext.Provider
      value={{
        parent,
        filter,
        setParent,
        setFilter,
        getParents,
        deleteParent,
        createParent,
        updateParent,
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};
