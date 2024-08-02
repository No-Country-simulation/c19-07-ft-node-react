import React, { createContext, useEffect, useState } from "react";

import { useAuthStore, useAxiosPrivate } from "../../../hooks";
import { RelationResponse } from "../interfaces";
import { OverviewResponse, OverviewData } from "../../../interfaces";

export interface ParentContextValue {
  overviewData: OverviewData | null;
}

export const ParentContext = createContext<ParentContextValue | undefined>(
  undefined
);

interface ParentProviderProps {
  children: React.ReactNode;
}

export const ParentProvider = ({ children }: ParentProviderProps) => {
  const api = useAxiosPrivate();
  const { user } = useAuthStore();

  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);

  const fetchStudentData = async () => {
    try {
      if (parentId === undefined) return;

      const studentIdRes = await api.get<RelationResponse>(
        `parents/relationwithstudent/${parentId}`
      );

      const studentId = studentIdRes.data.student.student_id;

      const overviewRes = await api.get<OverviewResponse>(
        `students-management/dashboard/${studentId}?periodo=PRIMER_PERIODO`
      );

      setOverviewData(overviewRes.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user === null) return;
    if (user.Parents?.parent_id === undefined) return;

    setParentId(user.Parents.parent_id);

    fetchStudentData();
  }, [parentId, user]);

  return (
    <ParentContext.Provider value={{ overviewData }}>
      {children}
    </ParentContext.Provider>
  );
};
