import blogConfig from '@/blog.config';
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as ModalWrapper,
} from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import convertBytes from '@/src/libs/convertBytes';
import tw from '@/src/libs/tw';

import useModal from '@/src/hooks/modal/useModal';

import useEditorStore from '@/src/store/editorStore';
import useFileStore from '@/src/store/fileStore';
import { Modal } from '@/src/store/modalStore';

const ImageInputModal = ({ modal }: { modal: Modal }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState('');

  const { source, slug } = useEditorStore(
    useShallow((state) => ({
      source: state.source,
      slug: state.slug,
    })),
  );
  const { files } = useFileStore(
    useShallow((state) => ({ files: state.files })),
  );
  const { removeModal } = useModal();

  const imageUrl = file ? URL.createObjectURL(file) : '';

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const fileName = acceptedFiles[0].name.split('.').slice(0, -1).join('.');

      // 파일에 한글 또는 공백이 포함되어 있으면 업로드 하지 않음.
      if (!/^[A-Za-z0-9\-_]+$/.test(fileName)) {
        toast.error(
          '파일 이름은 알파벳,숫자,특수문자(-, _)로만 이루어져야 합니다.',
        );
        return;
      }

      if (files.find((f) => f.name === acceptedFiles[0].name)) {
        toast.error('이미 같은 이름의 파일이 존재합니다.');
        return;
      }

      const fileUrl = `${blogConfig.postPath}/${slug}/${acceptedFiles[0].name}`;
      const newFilePath = `![${fileName}](${fileUrl})\n`;

      setFilePath(newFilePath);
      setFile(acceptedFiles[0]);
    },
    [source, slug],
  );

  const acceptedImageTypes: Accept = {};

  blogConfig.allowedImageTypes.forEach((type) => {
    acceptedImageTypes[type] = [];
  });

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: acceptedImageTypes,
    });

  const onOpenChange = () => {
    removeModal();
  };

  const confirmHandler = () => {
    if (modal.callback) modal.callback(file, filePath);
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
            <ModalBody>
              <div
                className={tw(
                  'flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-300 bg-default-100 transition-all duration-300 ease-in-out hover:border-primary-500 focus:border-primary-500 focus:outline-none',
                  isDragAccept && 'border-primary-500',
                  isDragReject && 'border-danger',
                )}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {!file && <p>이미지를 드래그 하거나, 클릭하여 선택하세요.</p>}
                {file && (
                  <div className="group relative h-full w-full">
                    <img
                      alt="preview"
                      className="h-full w-full rounded-lg object-cover blur-0 transition-all duration-300 ease-in-out group-hover:blur-sm"
                      src={imageUrl}
                    />
                    <div className="absolute left-1/2 top-1/2 flex max-w-full -translate-x-1/2 -translate-y-1/2 flex-col truncate opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                      <p>{file.name}</p>
                      <p>{convertBytes(file.size)}</p>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                닫기
              </Button>
              <Button
                isDisabled={!filePath}
                color="primary"
                onPress={confirmHandler}
              >
                추가
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default ImageInputModal;
