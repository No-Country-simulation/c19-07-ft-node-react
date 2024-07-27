import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

export const useContextUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
