import { useState } from "react";

interface ModalState<T = any> {
  isOpen: boolean;
  type: "create" | "edit" | "delete" | null;
  payload: T | null;
}


export const useModal = <T = any> () =>  {
  const [modalState, setModalState] = useState<ModalState<T>>({ isOpen: false, type: null,payload:null });

  const openModal = (type: "create" | "edit" | "delete", payload: T | null = null) => {
    setModalState({ isOpen: true, type, payload });
  };

  const closeModal = () => {
    
    setModalState((prev)=>({ ...prev, isOpen: false,type:null }));
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};
