import { Dialog, DialogPanel } from "@headlessui/react";
import React from "react";

interface IModalProvider {
  handleOpenModal(modal: React.ReactNode, options?: IOptions): void;
  handleCloseModal(): void;
}

interface IModalProviderProps {
  children: React.ReactNode;
}

export const ModalContext = React.createContext<IModalProvider>({
  handleOpenModal: () => {
    /* empty */
  },
  handleCloseModal: () => {
    /* empty */
  },
});

interface IOptions {
  withClose?: boolean;
}

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modal, setModal] = React.useState<React.ReactNode | null>(null);

  const handleOpenModal = React.useCallback((modal: React.ReactNode) => {
    setModal(modal);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ handleOpenModal, handleCloseModal }}>
      <Dialog
        open={!!modal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleCloseModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-1">
            <DialogPanel
              transition
              className="space-y-4 w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 text-center"
            >
              {modal}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {children}
    </ModalContext.Provider>
  );
};
