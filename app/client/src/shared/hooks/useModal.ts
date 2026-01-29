import { useContext } from "react";
import { ModalContext } from "@/app/modal_context";

export const useModal = () => {
  const contextValue = useContext(ModalContext);

  if (!contextValue) {
    throw new Error("useModal is not allowed to be used outside of ModalProvider");
  }

  return contextValue;
};
