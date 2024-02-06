import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import useModalStore from '@/src/store/modalStore';

const useModal = () => {
  const { modals, isOpen, addModal, removeModal, clearModals, openModal } =
    useModalStore(
      useShallow((state) => ({
        modals: state.modals,
        isOpen: state.isOpen,
        addModal: state.addModal,
        removeModal: state.removeModal,
        openModal: state.openModal,
        clearModals: state.clearModals,
      })),
    );

  useEffect(() => {
    window.addEventListener('popstate', () => {
      clearModals();
    });

    return () => {
      window.removeEventListener('popstate', () => {
        clearModals();
      });
    };
  }, []);

  useEffect(() => {
    if (modals.length > 0) {
      openModal();
    }
  }, [modals.length]);

  return {
    modals,
    isOpen,
    addModal,
    removeModal,
  };
};

export default useModal;
