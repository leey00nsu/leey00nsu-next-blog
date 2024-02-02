import { FaEye } from 'react-icons/fa';

import isPostChecked from '@/src/actions/post-detail/isPostChecked';
import getPostViewCount from '@/src/actions/supabase/getPostViewCount';
import updatePostViewCount from '@/src/actions/supabase/updatePostViewCount';

interface PostViewCountProps {
  slug: string;
}

const PostViewCount = async ({ slug }: PostViewCountProps) => {
  let viewCount = await getPostViewCount(slug);
  const isChecked = isPostChecked(slug);

  if (!isChecked) {
    await updatePostViewCount(slug, viewCount + 1);
    viewCount += 1;
  }

  return (
    <div className="flex w-full items-center justify-center gap-1 text-default-600">
      <p className="text-sm">{viewCount}</p>
      <FaEye />
    </div>
  );
};

export default PostViewCount;
