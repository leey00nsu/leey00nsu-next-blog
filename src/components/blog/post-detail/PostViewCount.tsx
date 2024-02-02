import { FaEye } from 'react-icons/fa';

import getPostViewCount from '@/src/actions/supabase/getPostViewCount';

interface PostViewCountProps {
  slug: string;
}

const PostViewCount = async ({ slug }: PostViewCountProps) => {
  const viewCount = await getPostViewCount(slug);

  return (
    <div className="flex w-full items-center justify-center gap-1 text-default-600">
      <p className="text-sm">{viewCount}</p>
      <FaEye />
    </div>
  );
};

export default PostViewCount;
