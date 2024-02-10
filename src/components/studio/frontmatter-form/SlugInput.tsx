import blogConfig from '@/blog.config';
import { Input } from '@nextui-org/react';
import { useShallow } from 'zustand/react/shallow';

import useEditorStore, { Frontmatter } from '@/src/store/editorStore';

const SlugInput = () => {
  const { source, slug, setSource, setSlug } = useEditorStore(
    useShallow((state) => ({
      source: state.source,
      slug: state.slug,
      setSource: state.setSource,
      setSlug: state.setSlug,
    })),
  );

  // 소스 이미지 경로의 slug를 현재 slug로 변경
  const syncImagePathSlug = (newSlug: string) => {
    let newSource = source;

    if (!newSlug) return newSource;

    // 이미지 경로 정규식
    const imagePathRegex = new RegExp(
      `\\!\\[([A-Za-z0-9\\-_]+)\\]\\((${blogConfig.postPath}/)(.*?)\\/(.*?)\\)`,
    );

    const imagePaths = newSource.match(new RegExp(imagePathRegex, 'g'));

    if (imagePaths) {
      imagePaths.forEach((imagePath) => {
        const [path, alt, postPath, , fileName] = imagePath.match(
          new RegExp(imagePathRegex),
        )!;
        const replacedString = `![${alt}](${postPath}${newSlug}/${fileName})`;

        newSource = newSource.replace(path, replacedString);
      });
    }

    return newSource;
  };

  const changeSlugHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value.trim();
    const newSource = syncImagePathSlug(newSlug);

    setSource(newSource);
    setSlug(newSlug);
  };

  const slugValidation = Frontmatter.pick({ slug: true }).safeParse({ slug });

  return (
    <Input
      isRequired
      type="text"
      label="slug"
      value={slug}
      onChange={changeSlugHandler}
      color="primary"
      isInvalid={!slugValidation.success}
      errorMessage={
        !slugValidation.success && slugValidation.error.issues[0].message
      }
    />
  );
};

export default SlugInput;
