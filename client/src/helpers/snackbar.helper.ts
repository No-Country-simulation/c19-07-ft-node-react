import { enqueueSnackbar, type VariantType } from "notistack";

import { StatusRespMsg } from "../interfaces";

export const showSnackbar = (message: string, variant: VariantType) => {
  enqueueSnackbar(message, { variant });
};

export const showStatusSnackbar = ({ ok, msg }: StatusRespMsg) => {
  if (ok) {
    enqueueSnackbar(msg, { variant: "success" });
  } else {
    enqueueSnackbar(msg, { variant: "error" });
  }
};
