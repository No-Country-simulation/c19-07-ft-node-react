import { createContext, ReactNode, useEffect, useState } from "react";

import { Filter } from "../interfaces";
import { userMessage } from "../constants";
import { useAxiosPrivate } from "../../../hooks";
import { StatusRespMsg, UsersResponse } from "../../../interfaces";

interface UserContextProps {
  children: ReactNode;
}

export interface UserContextValue {
  user: UsersResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UsersResponse | null>>;
  isLoading: boolean;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  getUsers: () => Promise<void>;
  createUser: (userData: any) => Promise<StatusRespMsg>;
  deleteUser: (userId: string) => Promise<StatusRespMsg>;
  updateUser: (userId: string, userData: any) => Promise<StatusRespMsg>;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

export const UserProvider = ({ children }: UserContextProps) => {
  const api = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UsersResponse | null>(null);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    page: "1",
    limit: "10",
    typeUser: "",
  });

  const getUsers = async () => {
    setIsLoading(true);

    const response = await api.get<UsersResponse>(
      `/admin/users?page=${filter.page}&limit=${filter.limit}&name=${filter.name}&type-user=${filter.typeUser}`
    );

    setUser(response.data);
    setIsLoading(false);
  };

  const createUser = async (data: any): Promise<StatusRespMsg> => {
    try {
      const response = await api.post("/admin/create-user", data);

      if (response.data.success) {
        await getUsers();

        return { ok: true, msg: userMessage.success.create };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const updateUser = async (id: string, data: any): Promise<StatusRespMsg> => {
    try {
      const response = await api.put(`/admin/update-user/${id}`, data);

      if (response.data.success) {
        await getUsers();

        return { ok: true, msg: userMessage.success.update };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  const deleteUser = async (id: string): Promise<StatusRespMsg> => {
    try {
      const response = await api.delete(`/admin/delete-user/${id}`);

      if (response.data.success) {
        getUsers();

        return { ok: true, msg: userMessage.success.delete };
      }

      return { ok: false, msg: userMessage.wrong };
    } catch (error) {
      return { ok: false, msg: userMessage.error };
    }
  };

  useEffect(() => {
    getUsers();
  }, [filter]);

  return (
    <UserContext.Provider
      value={{
        user,
        filter,
        setUser,
        getUsers,
        setFilter,
        isLoading,
        deleteUser,
        createUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
