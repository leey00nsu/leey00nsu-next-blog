

import MDEditor, {
  TextAreaTextApi,
  TextState,
  commands,
} from '@uiw/react-md-editor/nohighlight';
import { useDropzone } from 'react-dropzone';
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

  const onDrop = (acceptedFiles: File[]) => {
    // 파일에 한글 또는 공백이 포함되어 있으면 업로드 하지 않음.
    if (/[가-힣\s]/.test(acceptedFiles[0].name)) return;

    const fileName = acceptedFiles[0].name.split('.').slice(0, -1).join('.');
    const filePath = `/public/posts/blog/${slug}/${acceptedFiles[0].name}`;

    const newSource = `${source}\n![${fileName}](${filePath})\n`;
    setSource(newSource);

    addFile(acceptedFiles[0]);
  };

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

  return (
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
  );
};

export default Editor;
