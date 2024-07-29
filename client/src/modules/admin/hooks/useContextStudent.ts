import { useContext } from "react";

import { StudentContext } from "../contexts";

export const useContextStudent = () => {
  const context = useContext(StudentContext);

  if (context === undefined) {
    throw new Error("useContextStudent must be used within a StudentProvider");
  }

  return context;
};
