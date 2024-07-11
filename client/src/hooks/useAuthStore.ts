import { useAppSelector } from "./reduxTypedHooks";

export const useAuthStore = () => {
  const { status } = useAppSelector((state) => state.auth);

  return {
    status,
  };
};
