'use client';

import MDEditor from '@uiw/react-md-editor/nohighlight';
import { useState } from 'react';

import Preview from './Preview';

const Editor = () => {
  const [source, setSource] = useState('');

  return (
    <main className="min-w-screen flex min-h-screen">
      <div className="flex-1 p-4">
        <MDEditor
          value={source}
          onChange={(val) => setSource(val!)}
          extraCommands={[]}
          preview="edit"
          className="min-h-full"
        />
      </div>
      <div className="flex-1 p-4">
        <Preview source={source} />
      </div>
    </main>
  );
};

export default Editor;
