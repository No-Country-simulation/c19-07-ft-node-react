import { useContext } from "react";

import { TeacherContext } from "../contexts";

export const useContextTeacher = () => {
  const context = useContext(TeacherContext);

  if (context === undefined) {
    throw new Error("useContextTeacher must be used within a TeacherProvider");
  }

  return context;
};
