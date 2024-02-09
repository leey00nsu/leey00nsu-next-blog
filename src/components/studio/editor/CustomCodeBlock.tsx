import { TextAreaTextApi, TextState } from '@uiw/react-md-editor/commands';
import { FaFileCode } from 'react-icons/fa';

const CustomCodeBlock = () => {
  return {
    name: 'codeBlock',
    keyCommand: 'codeBlock',
    buttonProps: { 'aria-label': 'Insert code block' },
    icon: <FaFileCode />,
    execute: (state: TextState, api: TextAreaTextApi) => {
      let modifyText = `\`\`\`markdown title="title"\n${state.selectedText}\n\`\`\`\n`;
      if (!state.selectedText) {
        modifyText = `\`\`\`markdown title="title"\n코드를 입력하세요.\n\`\`\`\n`;
      }
      api.replaceSelection(modifyText);
    },
  };
};

export default CustomCodeBlock;
