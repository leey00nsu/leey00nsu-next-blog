'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

const PostComments = () => {
  const { theme } = useTheme();
  return (
    <Giscus
      repo="leey00nsu/blog.leey00nsu.site"
      repoId="R_kgDOLEAaVA"
      category="Announcements"
      categoryId="DIC_kwDOLEAaVM4Ccajz"
      strict="0"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="ko"
    />
  );
};

export default PostComments;
