import { Input } from '@nextui-org/react';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import useEditorStore, { Frontmatter } from '@/src/store/editorStore';

const TitleInput = () => {
  const { title, setTitle } = useEditorStore(
    useShallow((state) => ({
      title: state.title,
      setTitle: state.setTitle,
    })),
  );

  const titleValidation = Frontmatter.pick({ title: true }).safeParse({
    title,
  });

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Input
      isRequired
      classNames={{
        inputWrapper: [
          'bg-background',
          'group-data-[focus=true]:bg-background',
        ],
      }}
      type="text"
      label="제목"
      labelPlacement="outside"
      placeholder="제목을 입력하세요."
      value={title}
      onChange={changeTitleHandler}
      onClear={() => setTitle('')}
      color="default"
      isInvalid={!titleValidation.success}
      errorMessage={
        !titleValidation.success && titleValidation.error.issues[0].message
      }
    />
  );
};

export default TitleInput;
