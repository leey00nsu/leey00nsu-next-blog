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
  dropShadow = true,
  ...props
}: ImageProps & {
  base64?: string;
  keepBlur?: boolean;
  dropShadow?: boolean;
}) => {
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
    <span
      className={tw(
        'relative inline-block will-change-[filter]',
        dropShadow && 'drop-shadow-xl dark:drop-shadow-none',
      )}
    >
      {/* blur image */}
      <Image
        key={base64}
        alt={alt ?? ''}
        width={numberWidth}
        height={numberHeight}
        className={tw(
          'absolute inset-0 m-0 opacity-100  blur-md dark:blur-none',
          isMounted && !keepBlur && 'fade-out opacity-0',
        )}
        style={{
          aspectRatio: `${numberWidth} / ${numberHeight}`,
        }}
        src={base64!}
        priority
      />

      <Image
        key={src as string}
        alt={alt ?? ''}
        width={numberWidth}
        height={numberHeight}
        src={src}
        onLoad={() => setIsMounted(true)}
        className={tw('m-0 ', isMounted ? 'fade-in' : 'opacity-0')}
        {...props}
      />
    </span>
  );
};

export default CustomImage;
