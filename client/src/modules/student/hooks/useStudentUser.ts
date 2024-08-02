import { useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";

export const useContextStudent = () => {
  const studentContext = useContext(StudentContext);

  if (studentContext === undefined) {
    throw new Error("studentContextUser must be used within a StudentProvider");
  }

  return studentContext;
};
