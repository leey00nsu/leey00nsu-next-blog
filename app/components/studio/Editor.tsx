'use client';

import MDEditor, {
  TextAreaTextApi,
  TextState,
  commands,
} from '@uiw/react-md-editor/nohighlight';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import useFileStore from '@/app/store/fileStore';

import { savePostLocal } from '@/app/libs/savePost';

import Preview from './Preview';

const customImageBlock = {
  name: 'imageBlock',
  keyCommand: 'imageBlock',
  buttonProps: { 'aria-label': 'Insert image block' },
  icon: <>이미지</>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `![image.png]()\n`;
    api.replaceSelection(modifyText);
  },
};

const customCodeBlock = {
  name: 'codeBlock',
  keyCommand: 'codeBlock',
  buttonProps: { 'aria-label': 'Insert code block' },
  icon: <>코드</>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    let modifyText = `\`\`\`markdown title="title"\n${state.selectedText}\n\`\`\`\n`;
    if (!state.selectedText) {
      modifyText = `\`\`\`markdown title="title"\n코드를 입력하세요.\n\`\`\`\n`;
    }
    api.replaceSelection(modifyText);
  },
};

const Editor = () => {
  const addFile = useFileStore((state) => state.addFile);
  const files = useFileStore((state) => state.files);

  const [source, setSource] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // 파일에 한글 또는 공백이 포함되어 있으면 반환
    if (/[가-힣\s]/.test(acceptedFiles[0].name)) return;

    const fileName = acceptedFiles[0].name.split('.').slice(0, -1).join('.');
    const filePath = `/public/posts/blog/글제목/${acceptedFiles[0].name}`;

    setSource((prev) => {
      const text = `${prev}\n`;
      const modifyText = acceptedFiles
        .map(() => `![${fileName}](${filePath})\n`)
        .join('');
      return text + modifyText;
    });

    addFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
    },
  });

  const saveHandler = () => {
    const formData = new FormData();
    formData.append('title', 'title-slug');
    formData.append('content', source);

    files.forEach((file) => {
      formData.append('files', file);
    });

    savePostLocal(formData);
  };

  return (
    <main className="min-w-screen flex min-h-screen flex-col">
      <div>
        <button type="button" onClick={saveHandler}>
          저장
        </button>
      </div>

      <div className="flex grow flex-row">
        <div className="w-1/2 p-4" {...getRootProps()}>
          <input {...getInputProps()} />
          <MDEditor
            value={source}
            onChange={(val) => setSource(val!)}
            commands={[
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.hr,
              commands.divider,
              commands.group(
                [
                  commands.title1,
                  commands.title2,
                  commands.title3,
                  commands.title4,
                  commands.title5,
                  commands.title6,
                ],
                {
                  name: 'title',
                  groupName: 'title',
                  buttonProps: { 'aria-label': 'Insert title' },
                },
              ),
              commands.quote,
              commands.code,
              customCodeBlock,
              commands.divider,
              commands.link,
              customImageBlock,
              commands.divider,
              commands.unorderedListCommand,
              commands.orderedListCommand,
              commands.checkedListCommand,
            ]}
            extraCommands={[]}
            preview="edit"
            className="min-h-full w-full max-w-none"
          />
        </div>
        <div className="w-1/2 p-4 ">
          <Preview source={source} />
        </div>
      </div>
    </main>
  );
};

export default Editor;
