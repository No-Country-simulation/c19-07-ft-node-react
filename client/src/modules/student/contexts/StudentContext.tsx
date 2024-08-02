import React, { createContext, useEffect, useState } from "react";

import { useAuthStore, useAxiosPrivate } from "../../../hooks";
import { OverviewResponse, OverviewData } from "../../../interfaces";

export interface StudentContextValue {
  overviewData: OverviewData | null;
}

export const StudentContext = createContext<StudentContextValue | undefined>(
  undefined
);

interface StudentProviderProps {
  children: React.ReactNode;
}

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const api = useAxiosPrivate();
  const { user } = useAuthStore();

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
    if (user === null) return;
    if (user.Students?.student_id === undefined) return;

    setStudentId(user.Students.student_id);

    fetchStudentData();
  }, [studentId, user]);

  return (
    <StudentContext.Provider value={{ overviewData }}>
      {children}
    </StudentContext.Provider>
  );
};
