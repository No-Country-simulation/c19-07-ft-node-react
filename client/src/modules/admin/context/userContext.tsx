import { createContext, ReactNode, useEffect, useState } from "react";
import { UsersResponse } from "../../../interfaces";
import { useAxiosPrivate } from "../../../hooks";

interface UserContextProps {
  children: ReactNode;
}

export interface IFilter {
  name?: string;
  typeUser?: string;
  page?: string;
  limit?: string;
}
export interface IUserContextValue {
  user: UsersResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UsersResponse | null>>;
  deleteUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, userData: any) => Promise<void>;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  getUsers: () => Promise<void>;
}

export const UserContext = createContext<IUserContextValue | undefined>(
  undefined
);

export const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<UsersResponse | null>(null);
  const [filter, setFilter] = useState<IFilter>({
    name: "",
    typeUser: "",
    page: "1",
    limit: "10",
  });
  const api = useAxiosPrivate();

  const getUsers = async () => {
    const response = await api.get<UsersResponse>(
      `/admin/users?page=${filter.page}&limit=${filter.limit}&name=${filter.name}&type-user=${filter.typeUser}`
    );
    setUser(response.data);
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await api.delete(`/admin/delete-user/${userId}`);
      if (response.data.success) {
        api.get("admin/users").then((res) => {
          setUser(res.data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (userId: string, userData: any) => {
    try {
      const response = await api.put(`/admin/update-user/${userId}`, userData);
      if (response.data.success) {
        api.get("admin/users").then((res) => {
          setUser(res.data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [filter]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        deleteUser,
        updateUser,
        filter,
        getUsers,
        setFilter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
