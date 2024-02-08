import formatDate from '@/src/libs/formatDate';

interface DateProps {
  date: string;
}

const DateText = ({ date }: DateProps) => {
  return (
    <time dateTime={date} className="block text-xs text-default-600">
      {formatDate(new Date(date))}
    </time>
  );
};

export default DateText;
