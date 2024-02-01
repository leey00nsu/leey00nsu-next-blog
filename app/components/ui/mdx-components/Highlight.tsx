import React from 'react';

import tw from '@/app/libs/tw';

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

const Highlight = ({ children, className }: HighlightProps) => {
  const highlightClasses = 'text-personal-blue text-3xl sm:text-6xl';

  const classes = tw(highlightClasses, className);

  return <span className={classes}>{children}</span>;
};

export default Highlight;
