import { Input } from '@nextui-org/react';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import useEditorStore, { Frontmatter } from '@/src/store/editorStore';

const DescriptionInput = () => {
  const { description, setDescription } = useEditorStore(
    useShallow((state) => ({
      description: state.description,
      setDescription: state.setDescription,
    })),
  );

  const descriptionValidation = Frontmatter.pick({
    description: true,
  }).safeParse({
    description,
  });

  const changeDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
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
  );
};

export default DescriptionInput;
