'use client';

import { Post } from '@/.contentlayer/generated';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useEditorInitializer from '@/src/hooks/studio/useEditorInitializer';

import { FullScreenSpinner } from '../ui/spinner';
import Editor from './Editor';
import FileList from './FileList';
import FrontmatterForm from './FrontmatterForm';
import Menu from './Menu';
import Preview from './Preview';

interface StudioProps {
  post?: Post;
}

const Studio = ({ post }: StudioProps) => {
  const [initialized, setInitialized] = useState(false);
  const { status } = useSession();
  const { loading, initializeEditor } = useEditorInitializer(post);

  const router = useRouter();

  const isEdit = !!post;

  useEffect(() => {
    if (initialized) return;

    initializeEditor();
    setInitialized(true);
  }, [post]);

  if (status === 'unauthenticated') {
    router.replace('/auth/signin');
  }

  if (status === 'loading' || loading) {
    return <FullScreenSpinner />;
  }

  return (
    <main className="min-w-screen flex min-h-screen flex-col">
      <Menu isEdit={isEdit} />
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
