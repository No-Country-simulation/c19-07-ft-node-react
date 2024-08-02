import React, { createContext, useEffect, useState } from "react";

import { useAxiosPrivate } from "../../../hooks";
import { OverviewResponse, OverviewData } from "../../../interfaces";

export interface StudentContextValue {
  overviewData: OverviewData | null;
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const StudentContext = createContext<StudentContextValue | undefined>(
  undefined
);

interface StudentProviderProps {
  children: React.ReactNode;
}

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const api = useAxiosPrivate();

  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);

  const fetchStudentData = async () => {
    try {
      if (userId === undefined) return;

      const res = await api.get<OverviewResponse>(
        `students-management/dashboard/${userId}?periodo=PRIMER_PERIODO`
      );

      setOverviewData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [userId]);

  return (
    <StudentContext.Provider value={{ overviewData, setUserId }}>
      {children}
    </StudentContext.Provider>
  );
};
