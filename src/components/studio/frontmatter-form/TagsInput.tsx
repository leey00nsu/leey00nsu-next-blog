import { allPosts } from '@/.contentlayer/generated';
import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import parseTag from '@/src/libs/parseTag';
import tw from '@/src/libs/tw';

import useEditorStore, { Frontmatter } from '@/src/store/editorStore';

const TagsInput = () => {
  const { tags, setTags } = useEditorStore(
    useShallow((state) => ({
      tags: state.tags,
      setTags: state.setTags,
    })),
  );
  const [inputValue, setInputValue] = useState('');
  const isTagSelected = useRef(false);

  const allTags = parseTag(allPosts);

  const tagsValidation = Frontmatter.pick({ tags: true }).safeParse({ tags });

  const changeInputValueHandler = (value: string) => {
    setInputValue(value);
    isTagSelected.current = false;
  };

  const changeSelectionHandler = (key: React.Key) => {
    if (key && !tags.includes(key as string)) {
      isTagSelected.current = true;
      setTags([...tags, key as string]);
      setInputValue('');
    }
  };

  const keyDownHandler = (e: any) => {
    e.continuePropagation();

    if (e.key === 'Backspace' && !inputValue) {
      setTags(tags.slice(0, -1));
    }
    if (
      e.key === 'Enter' &&
      inputValue.trim() &&
      !tags.includes(inputValue) &&
      !isTagSelected.current
    ) {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const removeTagHandler = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <Autocomplete
        isRequired
        allowsCustomValue
        listboxProps={{
          key: tags.length, // 강제 리렌더링
        }}
        inputProps={{
          classNames: {
            label: ['-top-[1.5rem]', '!translate-y-0'],
            innerWrapper: ['flex-wrap'],
            inputWrapper: [
              'bg-background',
              'group-data-[focus=true]:bg-background',
              'h-auto',
              'static',
            ],
            input: ['h-10', 'w-[calc(100%-4rem)]'],
          },
        }}
        classNames={{
          endContentWrapper: ['h-10'],
        }}
        label="태그"
        placeholder="태그를 입력하세요."
        labelPlacement="outside"
        defaultItems={allTags}
        inputValue={inputValue}
        disabledKeys={tags}
        selectedKey={null}
        startContent={
          <div
            className={tw(
              'inline-flex w-full flex-wrap gap-1',
              tags.length > 0 && 'my-2',
            )}
          >
            {tags.map((tag) => (
              <Chip
                onClose={() => removeTagHandler(tag)}
                className="h-auto bg-personal-blue py-1 text-background"
                key={tag}
              >
                {tag}
              </Chip>
            ))}
          </div>
        }
        onInputChange={changeInputValueHandler}
        onSelectionChange={changeSelectionHandler}
        onKeyDown={keyDownHandler}
        isInvalid={!tagsValidation.success}
        errorMessage={
          !tagsValidation.success && tagsValidation.error.issues[0].message
        }
      >
        {(item) => (
          <AutocompleteItem key={item.tag}>{item.tag}</AutocompleteItem>
        )}
      </Autocomplete>
      {/* <Input
        isRequired
        isClearable
        classNames={{
          inputWrapper: [
            'bg-background',
            'group-data-[focus=true]:bg-background',
          ],
        }}
        type="text"
        label="태그"
        labelPlacement="outside"
        placeholder="태그를 입력하세요. (쉼표로 구분)"
        value={tags}
        onChange={changeTagsHandler}
        onClear={() => setTags('')}
        color="default"
        isInvalid={!tagsValidation.success}
        errorMessage={
          !tagsValidation.success && tagsValidation.error.issues[0].message
        }
      /> */}
    </div>
  );
};

export default TagsInput;
