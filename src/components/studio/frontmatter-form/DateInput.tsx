import { Input } from '@nextui-org/react';
import { useShallow } from 'zustand/react/shallow';

import dateToString from '@/src/libs/dateToString';

import useEditorStore, { Frontmatter } from '@/src/store/editorStore';

const DateInput = () => {
  const { date, setDate } = useEditorStore(
    useShallow((state) => ({
      date: state.date,
      setDate: state.setDate,
    })),
  );

  const dateValidation = Frontmatter.pick({ date: true }).safeParse({ date });

  const changeDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = dateToString(new Date(e.target.value));
    setDate(data);
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
      type="date"
      label="날짜"
      labelPlacement="outside"
      placeholder="날짜를 입력하세요."
      value={date}
      onChange={changeDateHandler}
      color="default"
      isInvalid={!dateValidation.success}
      errorMessage={
        !dateValidation.success && dateValidation.error.issues[0].message
      }
    />
  );
};

export default DateInput;
