import DateInput from './DateInput';
import DescriptionInput from './DescriptionInput';
import SlugInput from './SlugInput';
import TagsInput from './TagsInput';
import TitleInput from './TitleInput';

const FrontmatterForm = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <SlugInput />
      <TitleInput />
      <TagsInput />
      <DescriptionInput />
      <DateInput />
    </div>
  );
};

export default FrontmatterForm;
