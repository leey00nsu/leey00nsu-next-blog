'use client';

import '@/src/styles/editor.css';
import MDEditor, { commands } from '@uiw/react-md-editor/nohighlight';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import useEditorResize from '@/src/hooks/studio/useEditorResize';

import useEditorStore from '@/src/store/editorStore';

import CustomCodeBlock from './CustomCodeBlock';
import CustomImageBlock from './CustomImageBlock';

const Editor = () => {
  const { source, setSource } = useEditorStore(
    useShallow((state) => ({
      source: state.source,
      setSource: state.setSource,
    })),
  );
  const { resizeEditor } = useEditorResize();

  useEffect(() => {
    resizeEditor();
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
