import React, { createContext, useEffect, useState } from "react";

import { useAxiosPrivate } from "../../../hooks";
import { OverviewResponse, OverviewData } from "../../../interfaces";

export interface StudentContextValue {
  overviewData: OverviewData | null;
  setStudentId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const StudentContext = createContext<StudentContextValue | undefined>(
  undefined
);

interface StudentProviderProps {
  children: React.ReactNode;
}

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const api = useAxiosPrivate();

  const [studentId, setStudentId] = useState<string | undefined>(undefined);
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);

  const fetchStudentData = async () => {
    try {
      if (studentId === undefined) return;

      const res = await api.get<OverviewResponse>(
        `students-management/dashboard/${studentId}?periodo=PRIMER_PERIODO`
      );

      setOverviewData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [studentId]);

  return (
    <StudentContext.Provider value={{ overviewData, setStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};
