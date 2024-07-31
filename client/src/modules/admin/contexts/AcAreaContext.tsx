import { createContext, ReactNode, useEffect, useState } from "react";

import { Filter } from "../interfaces";
import { acAreaMessage } from "../constants";
import { useAxiosPrivate } from "../../../hooks";
import { StatusRespMsg, AcademicAreasResponse } from "../../../interfaces";

interface AcAreaContextProps {
  children: ReactNode;
}

export interface AcAreaContextValue {
  acArea: AcademicAreasResponse | null;
  setAcArea: React.Dispatch<React.SetStateAction<AcademicAreasResponse | null>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  getAcAreas: () => Promise<void>;
  createAcArea: (data: any) => Promise<StatusRespMsg>;
  deleteAcArea: (id: string) => Promise<StatusRespMsg>;
  updateAcArea: (id: string, data: any) => Promise<StatusRespMsg>;
}

export const AcAreaContext = createContext<AcAreaContextValue | undefined>(
  undefined
);

export const AcAreaProvider = ({ children }: AcAreaContextProps) => {
  const api = useAxiosPrivate();

  const [acArea, setAcArea] = useState<AcademicAreasResponse | null>(null);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    page: "1",
    limit: "10",
    typeUser: "",
  });

  const getAcAreas = async () => {
    const response = await api.get<AcademicAreasResponse>(
      `/academic-area/?page=${filter.page}&limit=${filter.limit}`
    );
    setAcArea(response.data);
  };

  const createAcArea = async (data: any): Promise<StatusRespMsg> => {
    try {
      const response = await api.post("academic-area/create", data);

      if (response.data.success) {
        await getAcAreas();

        return { ok: true, msg: acAreaMessage.success.create };
      }

      return { ok: false, msg: acAreaMessage.wrong };
    } catch (error) {
      return { ok: false, msg: acAreaMessage.error };
    }
  };

  const updateAcArea = async (
    id: string,
    data: any
  ): Promise<StatusRespMsg> => {
    try {
      const response = await api.put(`academic-area/${id}`, data);

      if (response.data.success) {
        await getAcAreas();

        return { ok: true, msg: acAreaMessage.success.update };
      }

      return { ok: false, msg: acAreaMessage.wrong };
    } catch (error) {
      return { ok: false, msg: acAreaMessage.error };
    }
  };

  const deleteAcArea = async (id: string): Promise<StatusRespMsg> => {
    try {
      const response = await api.delete(`academic-area/${id}`);

      if (response.data.success) {
        getAcAreas();

        return { ok: true, msg: acAreaMessage.success.delete };
      }

      return { ok: false, msg: acAreaMessage.wrong };
    } catch (error) {
      return { ok: false, msg: acAreaMessage.error };
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
