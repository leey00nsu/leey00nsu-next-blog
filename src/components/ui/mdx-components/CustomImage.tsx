'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import tw from '@/src/libs/tw';

const MAX_HEIGHT = 600;

const CustomImage = ({
  alt,
  width,
  height,
  src,
  base64,
  keepBlur = true,
  ...props
}: ImageProps & { base64?: string; keepBlur?: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);

  let numberWidth = Number(width);
  let numberHeight = Number(height);

  // 이미지의 높이가 최대를 넘어가면 이미지의 비율을 유지하며 크기를 변경한다.
  if (numberHeight && numberHeight > MAX_HEIGHT) {
    const ratio = MAX_HEIGHT / numberHeight;
    numberWidth = Math.round(numberWidth * ratio);
    numberHeight = Math.round(numberHeight * ratio);
  }

  return (
    <span className="relative inline-block drop-shadow-xl will-change-[filter] dark:drop-shadow-none">
      {/* blur image */}
      <Image
        alt={alt ?? ''}
        width={numberWidth}
        height={numberHeight}
        className={tw(
          'absolute inset-0 m-0 blur-md dark:blur-none',
          isMounted && !keepBlur && 'fade-out opacity-0',
        )}
        style={{
          aspectRatio: `${numberWidth} / ${numberHeight}`,
        }}
        src={base64!}
        priority
      />

      <Image
        alt={alt ?? ''}
        width={numberWidth}
        height={numberHeight}
        src={src}
        onLoad={() => setIsMounted(true)}
        className={tw('m-0', !isMounted ? 'opacity-0' : 'fade-in')}
        {...props}
      />
    </span>
  );
};

export default CustomImage;
