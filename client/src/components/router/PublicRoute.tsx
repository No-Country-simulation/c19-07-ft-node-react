import { PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";

import { useAuthStore } from "../../hooks";

type PublicRouteProps = PropsWithChildren;

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status } = useAuthStore();

  return status === "not-authenticated" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};
