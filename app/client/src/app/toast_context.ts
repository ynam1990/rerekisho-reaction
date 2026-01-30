import { createContext } from "react";
import type { ToastOptions } from "@/shared/ui/molecules";

export const ToastContext = createContext<
  (options: ToastOptions) => void
>(() => {});
