'use client';

import MDEditor, {
  TextAreaTextApi,
  TextState,
  commands,
} from '@uiw/react-md-editor/nohighlight';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import useEditorStore from '@/app/store/editorStore';
import useFileStore from '@/app/store/fileStore';

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
  const { source, slug, setSource } = useEditorStore(
    useShallow((state) => ({
      source: state.source,
      slug: state.slug,
      setSource: state.setSource,
    })),
  );

  const addFile = useFileStore((state) => state.addFile);

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

      const filePath = `/public/posts/blog/${slug}/${acceptedFiles[0].name}`;

      const newSource = `${source}\n![${fileName}](${filePath})\n`;
      setSource(newSource);

      addFile(acceptedFiles[0]);
    },
    [source, slug],
  );

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

  // 에디터 높이 자동 조절
  useEffect(() => {
    const editorElement = document.querySelector('#editor');
    const editorContentElement = document.querySelector('.w-md-editor-area');
    const textareaElement = document.querySelector('.w-md-editor-text-input');

    if (!editorElement || !textareaElement || !editorContentElement) return;

    const currentScrollTop = editorContentElement.scrollTop;

    textareaElement.setAttribute('style', 'height: auto');

    textareaElement.setAttribute(
      'style',
      `height: ${textareaElement.scrollHeight}px !important;
      min-height: 400px !important;
      -webkit-text-fill-color: inherit !important;`,
    );

    editorElement.setAttribute(
      'style',
      `max-height: 1000px !important;
      height: ${textareaElement.scrollHeight + 32}px !important;`,
    );

    editorContentElement.scrollTo(0, currentScrollTop);
  }, [source]);

  return (
    <div className="w-1/2" {...getRootProps()}>
      <input {...getInputProps()} />
      <MDEditor
        id="editor"
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
      />
    </div>
  );
};

export default Editor;
