'use client';

import { Post } from '@/.contentlayer/generated';
import { useEffect, useState } from 'react';

import useEditorInitializer from '@/src/hooks/studio/useEditorInitializer';

import { FullScreenSpinner } from '../ui/spinner';
import FileList from './FileList';
import FrontmatterForm from './frontmatter-form/FrontmatterForm';
import Menu from './Menu';
import Editor from './editor/Editor';
import Preview from './preview/Preview';

interface StudioProps {
  post?: Post;
}

const Studio = ({ post }: StudioProps) => {
  const [initialized, setInitialized] = useState(false);
  const { loading, initializeEditor } = useEditorInitializer(post);

  const isEdit = !!post;

  useEffect(() => {
    if (initialized) return;

    initializeEditor();
    setInitialized(true);
  }, [post]);

  if (loading) {
    return <FullScreenSpinner />;
  }

  return (
    <main className="min-w-screen flex min-h-screen flex-col">
      <Menu isEdit={isEdit} />
      <FrontmatterForm isEdit={isEdit} />
      <FileList />
      <div className="flex flex-row gap-4 p-4">
        <Editor />
        <Preview />
      </div>
    </main>
  );
};

export default Studio;
