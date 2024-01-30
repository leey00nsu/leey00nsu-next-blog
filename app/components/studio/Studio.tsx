'use client';

import { signIn, useSession } from 'next-auth/react';

import { LoadingSpinner } from '../ui/spinner';
import Editor from './Editor';
import FileList from './FileList';
import FrontmatterForm from './FrontmatterForm';
import Preview from './Preview';
import SaveOption from './SaveOption';

const Studio = () => {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    signIn('github', {
      callbackUrl: '/studio',
    });
  }

  if (!session) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <main className="min-w-screen flex min-h-screen flex-col">
      <SaveOption />
      <FrontmatterForm />
      <FileList />
      <div className="flex grow flex-row gap-4 p-4">
        <Editor />
        <Preview />
      </div>
    </main>
  );
};

export default Studio;
