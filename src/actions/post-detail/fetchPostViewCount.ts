import getPost from '../supabase/getPost';
import readPost from './readPost';

const fetchPostViewCount = async (slug: string) => {
  await readPost(slug);
  const { view } = await getPost(slug);

  return view;
};

export default fetchPostViewCount;
