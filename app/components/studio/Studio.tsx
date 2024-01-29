'use client';

import Editor from './Editor';
import FrontmatterForm from './FrontmatterForm';
import Preview from './Preview';
import SaveOption from './SaveOption';

const Studio = () => {


  return (
    <main className="min-w-screen flex min-h-screen flex-col">
      <SaveOption />
      <FrontmatterForm />
      <div className="flex grow flex-row">
        <Editor />
        <Preview />
      </div>
    </main>
  );
};

export default Studio;
