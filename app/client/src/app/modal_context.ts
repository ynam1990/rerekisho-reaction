import { createContext } from "react";
import type { ModalOptions } from "@/shared/ui/molecules";

export const ModalContext = createContext<
  { showModalWithOptions: (options: ModalOptions) => void; hideModal: () => void }
>({ showModalWithOptions: () => {}, hideModal: () => {} });
