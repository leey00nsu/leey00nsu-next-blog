import '@/src/styles/prose.css';
import React from 'react';

import tw from '@/src/libs/tw';

interface MDXWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const MDXWrapper = ({ children, className }: MDXWrapperProps) => {
  return (
    <div className={tw('prose prose-slate dark:prose-invert', className)}>
      {children}
    </div>
  );
};

export default MDXWrapper;
