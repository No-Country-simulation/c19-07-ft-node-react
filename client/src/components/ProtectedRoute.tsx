import { PropsWithChildren, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../hooks";

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { status } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "not-authenticated") {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate, status]);

  return children;
};
