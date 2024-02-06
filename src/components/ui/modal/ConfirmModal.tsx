import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as ModalWrapper,
} from '@nextui-org/react';

import useModal from '@/src/hooks/modal/useModal';

import { Modal } from '@/src/store/modalStore';

const ConfirmModal = ({ modal }: { modal: Modal }) => {
  const { removeModal } = useModal();

  const onOpenChange = () => {
    removeModal();
  };

  const confirmHandler = () => {
    if (modal.callback) modal.callback();
    removeModal();
  };

  return (
    <ModalWrapper placement="center" isOpen onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modal.title}
            </ModalHeader>
            <ModalBody>{modal.content}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                닫기
              </Button>
              <Button color="primary" onPress={confirmHandler}>
                확인
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default ConfirmModal;
