import { useState } from "react";

export const useFormVisivility = (value: boolean) => {
  const [isVisible, setIsVisible] = useState(false);

  setIsVisible(value);

  return { isVisible };
};
