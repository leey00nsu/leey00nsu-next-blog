import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import useEditorStore from '@/app/store/editorStore';
import useFileStore from '@/app/store/fileStore';

import { savePostLocal, savePostRemote } from '@/app/actions/savePost';

import LogoutButton from '../auth/LogoutButton';

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

  const toastResponse = (response: { success: boolean; message: string }) => {
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const saveHandler = async (type: string) => {
    const frontmatter = getFrontmatter();
    const content = `${frontmatter}\n${source}`;

    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('content', content);

    files.forEach((file) => {
      formData.append('files', file);
    });

    if (type === 'local') {
      const response = await savePostLocal(formData);
      toastResponse(response);
    }
    if (type === 'remote') {
      const response = await savePostRemote(formData);
      toastResponse(response);
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
      <LogoutButton />
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
