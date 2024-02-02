import parseDate from '@/src/libs/parseDate';

interface DateProps {
  date: string;
}

const Date = ({ date }: DateProps) => {
  return (
    <time dateTime={date} className="block text-xs text-default-600">
      {parseDate(date)}
    </time>
  );
};

export default Date;
