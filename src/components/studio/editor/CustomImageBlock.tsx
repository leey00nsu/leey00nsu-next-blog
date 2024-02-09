import { TextAreaTextApi, TextState } from '@uiw/react-md-editor/commands';
import { FaFileUpload } from 'react-icons/fa';

import useModal from '@/src/hooks/modal/useModal';

const CustomImageBlock = () => {
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
        callback: (text) => {
          const modifyText = `${text}`;
          api.replaceSelection(modifyText);
        },
      });
    },
  };
};

export default CustomImageBlock;
