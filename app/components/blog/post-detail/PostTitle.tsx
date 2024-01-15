import parseDate from "@/app/lib/parseDate";

interface PostTitleProps {
  title: string;
  date: string;
}

const PostTitle = ({ title, date }: PostTitleProps) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <time dateTime={date} className="block text-xs text-gray-600">
        {parseDate(date)}
      </time>
    </div>
  );
};

export default PostTitle;
