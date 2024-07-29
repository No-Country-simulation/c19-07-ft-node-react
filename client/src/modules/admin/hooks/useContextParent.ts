import { useContext } from "react";

import { ParentContext } from "../contexts";

export const useContextParent = () => {
  const context = useContext(ParentContext);

  if (context === undefined) {
    throw new Error("useContextParent must be used within a ParentProvider");
  }

  return context;
};
