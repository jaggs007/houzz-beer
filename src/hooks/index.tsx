import { useState } from "react";

interface ModalState {
  isOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const useModal = (): ModalState => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpenModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onOpenModal,
    onCloseModal,
  };
};
