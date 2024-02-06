'use client';

import useModal from '@/src/hooks/modal/useModal';

import { Modal } from '@/src/store/modalStore';

import ConfirmModal from './ConfirmModal';

const ModalRenderer = ({ modal }: { modal: Modal }) => {
  switch (modal.type) {
    case 'confirm':
      return <ConfirmModal modal={modal} />;
    default:
      return null;
  }
};

const ModalProvider = () => {
  const { isOpen, modals } = useModal();

  if (!isOpen) return null;

  return (
    <>
      {modals.map((modal) => (
        <ModalRenderer key={modal.title} modal={modal} />
      ))}
    </>
  );
};

export default ModalProvider;
