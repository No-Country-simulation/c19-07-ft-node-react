import { PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";

import { useAuthStore } from "../../hooks";

type PrivateRouteProps = PropsWithChildren;

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status } = useAuthStore();

  return status === "authenticated" ? (
    children
  ) : (
    <Navigate to="/auth/login" replace />
  );
};
