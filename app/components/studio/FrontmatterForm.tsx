import { Input } from '@nextui-org/react';
import { useShallow } from 'zustand/react/shallow';

import useEditorStore from '@/app/store/editorStore';

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
      />
      <Input
        isRequired
        type="text"
        label="제목"
        value={title}
        onChange={changeTitleHandler}
        color="primary"
      />
      <Input
        isRequired
        type="text"
        label="태그"
        value={tags}
        onChange={changeTagsHandler}
        color="primary"
      />
      <Input
        isRequired
        type="text"
        label="설명"
        value={description}
        onChange={changeDescriptionHandler}
        color="primary"
      />
      <Input
        isRequired
        type="date"
        label="날짜"
        value={date}
        onChange={changeDateHandler}
        color="primary"
      />
    </div>
  );
};

export default FrontmatterForm;
