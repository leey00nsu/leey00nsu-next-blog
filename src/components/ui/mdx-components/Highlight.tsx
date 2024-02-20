import React from 'react';

import tw from '@/src/libs/tw';

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

const Highlight = ({ children, className }: HighlightProps) => {
  return (
    <span className={tw('text-3xl text-personal-blue sm:text-6xl', className)}>
      {children}
    </span>
  );
};

export default Highlight;
