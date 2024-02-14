'use client';

import { Chip } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { PostTag } from '@/src/libs/parseTag';
import toggleQueryString from '@/src/libs/toggleQueryString';
import tw from '@/src/libs/tw';

interface PostTagsProps {
  postTags: PostTag[];
  showCount?: boolean;
  truncate?: boolean;
  clickable?: boolean;
}

const PostTags = ({
  postTags,
  showCount,
  truncate,
  clickable,
}: PostTagsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const clickTagHandler = (tag: string) => {
    if (!clickable) return;
    const tags = searchParams.getAll('tags');
    const newQueryString = toggleQueryString(tags, 'tags', tag);

    router.push(`${pathname}?${newQueryString}`);
  };

  const isSelected = (tag: string) => {
    const tags = searchParams.getAll('tags');
    return tags.includes(tag);
  };

  return (
    <div
      className={tw('flex w-full gap-2', truncate ? 'truncate' : 'flex-wrap')}
    >
      {postTags.map((postTag) => (
        <Chip
          onClick={() => clickTagHandler(postTag.tag)}
          className={tw(
            clickable && 'cursor-pointer',
            clickable && isSelected(postTag.tag)
              ? 'bg-personal-blue text-background'
              : 'bg-personal-blue/10 text-foreground',
          )}
          key={postTag.tag}
          variant="flat"
        >
          <span>{postTag.tag} </span>
          {showCount && <span>({postTag.count})</span>}
        </Chip>
      ))}
    </div>
  );
};

export default PostTags;
