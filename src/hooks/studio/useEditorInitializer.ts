import { Post } from '@/.contentlayer/generated';
import blogConfig from '@/blog.config';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import getImageFileNames from '@/src/actions/studio/getImageFileNames';

import dateToString from '@/src/libs/dateToString';
import getSuffix from '@/src/libs/getSuffix';

import useEditorStore from '@/src/store/editorStore';
import useFileStore from '@/src/store/fileStore';

const useEditorInitializer = (post: Post | undefined) => {
  const [loading, setLoading] = useState(true);

  const { setSource, setSlug, setTitle, setTags, setDescription, setDate } =
    useEditorStore(
      useShallow((state) => ({
        setSource: state.setSource,
        setSlug: state.setSlug,
        setTitle: state.setTitle,
        setTags: state.setTags,
        setDescription: state.setDescription,
        setDate: state.setDate,
      })),
    );

  const { setFiles } = useFileStore(
    useShallow((state) => ({
      setFiles: state.setFiles,
    })),
  );

  // 게시글에 포함되어있는 이미지 파일을 다시 File 객체로 변환
  const getFiles = async (slug: string) => {
    const files = [];
    const fileNames = await getImageFileNames(slug);
    const postPath = getSuffix(blogConfig.postPath, 'public');

    for (const fileName of fileNames) {
      const image = await fetch(`${postPath}/${slug}/${fileName}`);
      const blob = await image.blob();
      if (blogConfig.allowedImageTypes.includes(blob.type)) {
        const file = new File([blob], fileName, { type: blob.type });
        files.push(file);
      }
    }

    return files;
  };

  const resetEditor = () => {
    setSource('');
    setSlug('');
    setTitle('');
    setTags([]);
    setDescription('');
    setDate(dateToString(new Date()));
    setFiles([]);
  };

  const initializeEditor = async () => {
    if (post) {
      setSource(post.body.raw);
      setSlug(post.slug);
      setTitle(post.title);
      setTags(post.tags);
      setDescription(post.description);
      setDate(dateToString(new Date(post.date)));

      const files = await getFiles(post.slug);
      setFiles(files);
    } else {
      resetEditor();
    }
    setLoading(false);
  };

  return { loading, initializeEditor, resetEditor };
};

export default useEditorInitializer;
