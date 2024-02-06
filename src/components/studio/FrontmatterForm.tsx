import { Input } from '@nextui-org/react';
import { useShallow } from 'zustand/react/shallow';

import useEditorStore, { Frontmatter } from '@/src/store/editorStore';

const FrontmatterForm = () => {
  const {
    slug,
    title,
    tags,
    description,
    date,
    setSlug,
    setTitle,
    setTags,
    setDescription,
    setDate,
  } = useEditorStore(
    useShallow((state) => ({
      slug: state.slug,
      title: state.title,
      tags: state.tags,
      description: state.description,
      date: state.date,
      setSlug: state.setSlug,
      setTitle: state.setTitle,
      setTags: state.setTags,
      setDescription: state.setDescription,
      setDate: state.setDate,
    })),
  );

  const titleValidation = Frontmatter.pick({ title: true }).safeParse({
    title,
  });
  const slugValidation = Frontmatter.pick({ slug: true }).safeParse({ slug });
  const tagsValidation = Frontmatter.pick({ tags: true }).safeParse({ tags });
  const descriptionValidation = Frontmatter.pick({
    description: true,
  }).safeParse({
    description,
  });
  const dateValidation = Frontmatter.pick({ date: true }).safeParse({ date });

  const changeSlugHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeTagsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const changeDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const changeDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new Date(e.target.value).toISOString().slice(0, 10);
    setDate(data);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
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
      <Input
        isRequired
        type="text"
        label="제목"
        value={title}
        onChange={changeTitleHandler}
        color="primary"
        isInvalid={!titleValidation.success}
        errorMessage={
          !titleValidation.success && titleValidation.error.issues[0].message
        }
      />
      <Input
        isRequired
        type="text"
        label="태그"
        value={tags}
        onChange={changeTagsHandler}
        color="primary"
        isInvalid={!tagsValidation.success}
        errorMessage={
          !tagsValidation.success && tagsValidation.error.issues[0].message
        }
      />
      <Input
        isRequired
        type="text"
        label="설명"
        value={description}
        onChange={changeDescriptionHandler}
        color="primary"
        isInvalid={!descriptionValidation.success}
        errorMessage={
          !descriptionValidation.success &&
          descriptionValidation.error.issues[0].message
        }
      />
      <Input
        isRequired
        type="date"
        label="날짜"
        value={date}
        onChange={changeDateHandler}
        color="primary"
        isInvalid={!dateValidation.success}
        errorMessage={
          !dateValidation.success && dateValidation.error.issues[0].message
        }
      />
    </div>
  );
};

export default FrontmatterForm;
