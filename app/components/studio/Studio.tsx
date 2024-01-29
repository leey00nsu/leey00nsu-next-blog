'use client';

import Editor from './Editor';
import FileList from './FileList';
import FrontmatterForm from './FrontmatterForm';
import Preview from './Preview';
import SaveOption from './SaveOption';

const Studio = () => {
  return (
    <main className="min-w-screen flex min-h-screen flex-col">
      <SaveOption />
      <FrontmatterForm />
      <FileList />
      <div className="flex grow flex-row">
        <Editor />
        <Preview />
      </div>
    </main>
  );
};

export default Studio;
