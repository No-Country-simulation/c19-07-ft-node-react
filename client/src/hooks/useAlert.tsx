import { useEffect, useState } from "react";

import { useAppSelector } from "./reduxTypedHooks";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useAlert = () => {
  const { user } = useAppSelector((state) => state.auth);

  const api = useAxiosPrivate();

  const [alert, setAlert] = useState<any>([]);

  useEffect(() => {
    api
      .get(`/alerts/${user?.user_id}`)
      .then((res) => {
        if (res.status === 200) {
          setAlert(res.data);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return {
    alert,
    setAlert,
  };
};
