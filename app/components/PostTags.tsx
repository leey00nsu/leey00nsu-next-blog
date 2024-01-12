import { PostTag } from '@/app/lib/parseTag';
import { Button } from '@nextui-org/react';

interface PostTagsProps {
  postTags: PostTag[];
  showCount?: boolean;
}

const PostTags = ({ postTags, showCount }: PostTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {postTags.map((postTag) => (
        <Button size="sm" disableRipple variant="flat" key={postTag.tag}>
          <span>{postTag.tag}</span>
          {showCount && <span>({postTag.count})</span>}
        </Button>
      ))}
    </div>
  );
};

export default PostTags;
