import { TextAreaTextApi, TextState } from '@uiw/react-md-editor/commands';
import { FaFileUpload } from 'react-icons/fa';
import { useShallow } from 'zustand/react/shallow';

import useModal from '@/src/hooks/modal/useModal';

import useFileStore from '@/src/store/fileStore';

const CustomImageBlock = () => {
  const { addFile } = useFileStore(
    useShallow((state) => ({ addFile: state.addFile })),
  );

  const { addModal } = useModal();

  return {
    name: 'imageBlock',
    keyCommand: 'imageBlock',
    buttonProps: { 'aria-label': 'Insert image block' },
    icon: <FaFileUpload />,
    execute: (state: TextState, api: TextAreaTextApi) => {
      addModal({
        type: 'image',
        title: '이미지 업로드',
        content: <></>,
        callback: (file: File, filePath: string) => {
          addFile(file);
          const modifyText = `${filePath}`;
          api.replaceSelection(modifyText);
        },
      });
    },
  };
};

export default CustomImageBlock;
