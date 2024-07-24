import { useState } from "react";
import { useEffect } from "react";
import { useAxiosPrivate } from "../../../hooks";
import { Student } from "../../../interfaces";

export const useStudent = () => {
  const api = useAxiosPrivate();

  const [students, setStudents] = useState<any[]>([]);

  const fetchStudents = async () => {
    
    try {
      const response = await api.get(`/parents/details`);
      setStudents(response.data);
      console.log(students);      
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    fetchStudents,
    students,
  };
};
