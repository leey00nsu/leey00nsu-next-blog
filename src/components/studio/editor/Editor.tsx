'use client';

import MDEditor, { commands } from '@uiw/react-md-editor/nohighlight';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import useEditorStore from '@/src/store/editorStore';

import CustomCodeBlock from './CustomCodeBlock';
import CustomImageBlock from './CustomImageBlock';

const Editor = () => {
  const { source, setSource } = useEditorStore(
    useShallow((state) => ({
      source: state.source,
      slug: state.slug,
      setSource: state.setSource,
    })),
  );

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
    <div className="w-1/2">
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
          CustomCodeBlock(),
          commands.divider,
          commands.link,
          commands.image,
          CustomImageBlock(),
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
