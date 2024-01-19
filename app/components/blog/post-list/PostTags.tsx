import { Chip } from '@nextui-org/react';

import { PostTag } from '@/app/libs/parseTag';

interface PostTagsProps {
  postTags: PostTag[];
  showCount?: boolean;
}

const PostTags = ({ postTags, showCount }: PostTagsProps) => {
  return (
    <div className="flex w-full gap-2 truncate ">
      {postTags.map((postTag) => (
        <Chip className="bg-personal-blue/10" key={postTag.tag} variant="flat">
          <span>{postTag.tag}</span>
          {showCount && <span>({postTag.count})</span>}
        </Chip>
      ))}
    </div>
  );
};

export default PostTags;
