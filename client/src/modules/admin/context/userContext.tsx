import { createContext, ReactNode, useEffect, useState } from "react";
import { UsersResponse } from "../../../interfaces";
import { useAxiosPrivate } from "../../../hooks";

interface UserContextProps {
  children: ReactNode;
}

export interface IUserContextValue {
  user: UsersResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UsersResponse | null>>;
  deleteUser: (userId:string) => Promise<void>;
  updateUser: (userId:string,userData: any) => Promise<void>;
  getUserFilter: (filtros:{page?:string,limit?:string,name?:string,typeUser?:string}) => Promise<void>;
}

export const UserContext = createContext<IUserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<UsersResponse | null>(null);
  const api = useAxiosPrivate();
  const getUsers = async () => {
    const response = await api.get<UsersResponse>("admin/users");
    setUser(response.data);
  };

  const deleteUser = async (userId:string) => {
    try {
        const response = await api.delete(`/admin/delete-user/${userId}`);
        if(response.data.success) {
            api.get("admin/users").then((res) => {
                setUser(res.data);
            })
        }
    } catch (error) {
        console.log(error);
    }
  };

  const updateUser = async (userId:string,userData: any) => {
    try {
        const response = await api.put(`/admin/update-user/${userId}`, userData);
        if(response.data.success) {
            api.get("admin/users").then((res) => {
                setUser(res.data);
            })
        }
    } catch (error) {
        console.log(error);
    }
  }
  const getUserFilter = async ({page,limit,name,typeUser}) => {
      try {
        const response = await api.get<UsersResponse>(`admin/users?page=${page}&limit=${limit}&name=${name}&type-user=${typeUser}`);
        if(response.data.success) {
            setUser(response.data);
        }
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser,deleteUser,updateUser,getUserFilter }}>
      {children}
    </UserContext.Provider>
  );
};
