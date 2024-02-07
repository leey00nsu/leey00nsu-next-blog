'use client';

import { Post } from '@/.contentlayer/generated';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import useEditorInitializer from '@/src/hooks/studio/useEditorInitializer';

import { FullScreenSpinner } from '../ui/spinner';
import Editor from './Editor';
import FileList from './FileList';
import FrontmatterForm from './FrontmatterForm';
import Preview from './Preview';
import SaveOption from './SaveOption';

interface StudioProps {
  post?: Post;
}

const Studio = ({ post }: StudioProps) => {
  const [initialized, setInitialized] = useState(false);
  const { data: session, status } = useSession();
  const { loading, initializeEditor } = useEditorInitializer(post);

  useEffect(() => {
    if (initialized) return;

    initializeEditor();
    setInitialized(true);
  }, [post]);

  if (status === 'unauthenticated') {
    signIn('github', {
      callbackUrl: '/studio',
    });
  }

  if (!session || loading) {
    return <FullScreenSpinner />;
  }

  return (
    <main className="min-w-screen flex min-h-screen flex-col">
      <SaveOption />
      <FrontmatterForm />
      <FileList />
      <div className="flex flex-row gap-4 p-4">
        <Editor />
        <Preview />
      </div>
    </main>
  );
};

export default Studio;
