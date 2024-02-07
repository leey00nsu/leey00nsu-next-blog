import { Post } from '@/.contentlayer/generated';
import blogConfig from '@/blog.config';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import getImageFileNames from '@/src/actions/studio/getImageFileNames';

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

  const getFiles = async (slug: string) => {
    const files = [];
    const fileNames = await getImageFileNames(slug);
    for (const fileName of fileNames) {
      const image = await fetch(`/posts/blog/${slug}/${fileName}`);
      const blob = await image.blob();
      if (blogConfig.allowedImageTypes.includes(blob.type)) {
        const file = new File([blob], fileName, { type: blob.type });
        files.push(file);
      }
    }

    return files;
  };

  const initializeEditor = async () => {
    if (post) {
      setSource(post.body.raw);
      setSlug(post.slug);
      setTitle(post.title);
      setTags(post.tags.join(','));
      setDescription(post.description);
      setDate(post.date.slice(0, 10));

      const files = await getFiles(post.slug);

      setFiles(files);
      setLoading(false);
    }
  };

  return { loading, initializeEditor };
};

export default useEditorInitializer;
