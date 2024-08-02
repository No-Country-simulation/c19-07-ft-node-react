import { useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";

export const useContextStudent = () => {
  const studentContext = useContext(StudentContext);

  if (studentContext === undefined) {
    throw new Error("useContextStudent must be used within a StudentProvider");
  }

  return studentContext;
};
