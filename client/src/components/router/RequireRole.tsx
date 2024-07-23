import type { PropsWithChildren } from "react";

import { Unathorized } from "..";
import { Role } from "../../interfaces";
import { useAuthStore } from "../../hooks";

type RequireRoleProps = PropsWithChildren & {
  allowedRoles: Role[];
};

export const RequireRole = ({ children, allowedRoles }: RequireRoleProps) => {
  const { user } = useAuthStore();

  return allowedRoles.includes(user!.type_user) ? children : <Unathorized />;
};
