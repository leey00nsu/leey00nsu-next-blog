'use client';

import { useState } from 'react';

import Preview from './Preview';

const Editor = () => {
  const [source, setSource] = useState('');

  return (
    <main className="min-w-screen flex min-h-screen">
      <div className="w-1/2">
        <textarea
          className="h-full w-full"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>
      <div className="w-1/2">
        <Preview source={source} />
      </div>
    </main>
  );
};

export default Editor;
