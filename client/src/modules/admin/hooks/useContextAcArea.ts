import { useContext } from "react";

import { AcAreaContext } from "../contexts";

export const useContextAcArea = () => {
  const context = useContext(AcAreaContext);

  if (context === undefined) {
    throw new Error("useContextAcArea must be used within a AcAreaProvider");
  }

  return context;
};
