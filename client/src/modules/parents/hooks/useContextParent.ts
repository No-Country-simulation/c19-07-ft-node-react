import { useContext } from "react";
import { ParentContext } from "../contexts/ParentContext";

export const useContextParent = () => {
  const parentContext = useContext(ParentContext);

  if (parentContext === undefined) {
    throw new Error("useContextParent must be used within a ParentProvider");
  }

  return parentContext;
};
