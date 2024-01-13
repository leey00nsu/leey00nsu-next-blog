'use client';

import { useEffect } from 'react';
import tocbot from 'tocbot';

const Toc = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.toc-content',
      headingSelector: 'h2, h3',
      headingsOffset: 250,
      scrollSmoothOffset: -250,
      orderedList: false,
    });

    return () => tocbot.destroy();
  }, []);

  return (
    <aside className="fixed right-[calc(50%-336px)] top-[128px] hidden translate-x-full px-4 py-20 text-medium xl:block">
      <div className="toc" />
    </aside>
  );
};

export default Toc;
