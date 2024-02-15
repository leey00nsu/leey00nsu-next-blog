import { Post } from '@/.contentlayer/generated';

import { CustomImage } from '../../ui/mdx-components';

interface PostThumbnailProps {
  thumbnail: Post['thumbnail'];
}

const PostThumbnail = ({ thumbnail }: PostThumbnailProps) => {
  return (
    <div className="flex aspect-square max-h-[300px] w-full items-center justify-center overflow-hidden">
      {thumbnail.src && (
        <CustomImage dropShadow={false} keepBlur={false} {...thumbnail} />
      )}
      {!thumbnail.src && (
        <div className="relative flex h-full w-full items-center justify-center bg-neutral-100 font-bold text-neutral-800">
          <p className="text-xl ">&quot;</p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap p-2 text-lg">
            {thumbnail.alt}
          </p>
          <p className=" text-xl ">&quot;</p>
        </div>
      )}
    </div>
  );
};

export default PostThumbnail;
