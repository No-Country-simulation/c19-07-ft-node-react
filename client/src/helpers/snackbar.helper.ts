import { enqueueSnackbar, type VariantType } from "notistack";

import { Message } from "../interfaces";

export const showSnackbar = (message: string, variant: VariantType) => {
  enqueueSnackbar(message, { variant });
};

export const showStatusSnackbar = ({ ok, msg }: Message) => {
  if (ok) {
    enqueueSnackbar(msg, { variant: "success" });
  } else {
    enqueueSnackbar(msg, { variant: "error" });
  }
};
