import { ImageResponse } from 'next/og';

export const alt = 'leey00nsu 블로그';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff',
  );
  const pretendardSemiBold = await response.arrayBuffer();

  return new ImageResponse(
    (
      <div
        tw="relative flex h-full w-full items-center justify-center text-neutral-800 bg-neutral-100"
        style={{
          fontFamily: 'PretendardSemiBold',
        }}
      >
        <p tw=" text-5xl max-w-[1000px] p-2 text-[#086ab6] text-center">
          leey00nsu
        </p>
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
