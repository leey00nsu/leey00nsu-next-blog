import {
  ModalBody,
  ModalContent,
  Modal as ModalWrapper,
  Spinner,
} from '@nextui-org/react';
import { useEffect } from 'react';

import useModal from '@/src/hooks/modal/useModal';

import { Modal } from '@/src/store/modalStore';

const LoadingModal = ({ modal }: { modal: Modal }) => {
  const { removeModal } = useModal();

  const resolveHandler = async () => {
    if (modal.callback) {
      await modal.callback();
      removeModal();
    }
  };

  useEffect(() => {
    resolveHandler();
  }, []);

  return (
    <ModalWrapper placement="center" isOpen hideCloseButton>
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className="flex h-20 flex-col items-center justify-center gap-2">
                <Spinner size="md" />
                <p>{modal.title}</p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default LoadingModal;
