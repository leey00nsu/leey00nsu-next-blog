import { allPosts } from '@/.contentlayer/generated';
import { ImageResponse } from 'next/og';

export const alt = 'leey00nsu 블로그';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff',
  );
  const pretendardSemiBold = await response.arrayBuffer();

  return new ImageResponse(
    (
      <div
        tw="flex flex-col h-full w-full items-center justify-center text-white"
        style={{
          background:
            'linear-gradient(90deg, rgba(74,131,190,1) 0%, rgba(6,182,212,1) 0%, rgba(59,130,246,1) 100%)',
          fontFamily: 'PretendardSemiBold',
        }}
      >
        <img
          tw="w-[120px] h-[120px] rounded-full"
          src="https://avatars.githubusercontent.com/u/101182523?v=4"
          alt="Rounded avatar"
        />
        <p tw="flex text-8xl ">leey00nsu 블로그</p>
        <p tw="flex text-4xl ">{currentPost?.title}</p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'PretendardSemiBold',
          data: pretendardSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    },
  );
}
