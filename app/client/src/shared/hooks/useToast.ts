import { useContext } from "react";
import { ToastContext } from "@/app/toast_context";

export const useToast = () => {
  const showToastWithOptions = useContext(ToastContext);

  if (!showToastWithOptions) {
    throw new Error("useToast is not allowed to be used outside of ToastProvider");
  }

  return showToastWithOptions;
};
