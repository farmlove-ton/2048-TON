import { useState } from "react";

interface IProps {
  initialOpen?: boolean;
}

export const useModal = ({ initialOpen = false }: IProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen,
    close,
    open,
  };
};
