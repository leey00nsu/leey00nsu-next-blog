import { Button } from '@nextui-org/react';
import { useShallow } from 'zustand/react/shallow';

import useEditorStore from '@/app/store/editorStore';
import useFileStore from '@/app/store/fileStore';

import { savePostLocal, savePostRemote } from '@/app/libs/savePost';

const SaveOption = () => {
  const { source, slug, title, tags, description, date } = useEditorStore(
    useShallow((state) => ({
      source: state.source,
      slug: state.slug,
      title: state.title,
      tags: state.tags,
      description: state.description,
      date: state.date,
    })),
  );
  const files = useFileStore((state) => state.files);

  const getFrontmatter = () => {
    const parsedTags = tags
      .split(',')
      .map((tag) => `\n  - ${tag}`)
      .join('');

    const frontmatter = `---
slug: ${slug}
title: ${title}
tags: ${parsedTags}
description: ${description}
date: ${date}
---`;

    return frontmatter;
  };

  const saveHandler = (type: string) => {
    const frontmatter = getFrontmatter();
    const content = `${frontmatter}\n${source}`;

    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('content', content);

    files.forEach((file) => {
      formData.append('files', file);
    });

    if (type === 'local') {
      savePostLocal(formData);
    }
    if (type === 'remote') {
      savePostRemote(formData);
    }
  };

  return (
    <div className="flex flex-row justify-end gap-2 p-4">
      {/* <Button
        color="primary"
        variant="flat"
        onClick={() => saveHandler('local')}
      >
        파일로 저장
      </Button> */}
      <Button
        color="primary"
        variant="flat"
        onClick={() => saveHandler('remote')}
      >
        업로드
      </Button>
    </div>
  );
};

export default SaveOption;
