'use client';

import { useEffect, useState } from 'react';

import useEditorInitializer from '@/src/hooks/studio/useEditorInitializer';

import { FullScreenSpinner } from '../ui/spinner';
import FileList from './FileList';
import Menu from './Menu';
import Editor from './editor/Editor';
import FrontmatterForm from './frontmatter-form/FrontmatterForm';
import Preview from './preview/Preview';

const Playground = () => {
  const [initialized, setInitialized] = useState(false);
  const { loading, initializeEditor } = useEditorInitializer(undefined);

  useEffect(() => {
    if (initialized) return;

    initializeEditor();
    setInitialized(true);
  }, []);

  if (loading) {
    return <FullScreenSpinner />;
  }

  return (
    <main className="min-w-screen flex min-h-screen flex-col">
      <Menu isPlayground />
      <FrontmatterForm />
      <FileList />
      <div className="flex flex-row gap-4 p-4">
        <Editor />
        <Preview />
      </div>
    </main>
  );
};

export default Playground;
