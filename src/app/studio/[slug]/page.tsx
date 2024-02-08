import { allPosts } from '@/.contentlayer/generated';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { AuthRoute } from '@/src/components/routes';
import { Studio } from '@/src/components/studio';
import { FullScreenSpinner } from '@/src/components/ui/spinner';

export const generateStaticParams = () => {
  return allPosts.map((post) => ({ slug: post.slug }));
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  if (!currentPost) notFound();

  return (
    <Suspense fallback={<FullScreenSpinner />}>
      <AuthRoute condition redirectPath="/auth/signin">
        <Studio post={currentPost} />
      </AuthRoute>
    </Suspense>
  );
};

export default Page;
