'use client';

import Image, { ImageProps } from 'next/image';

const MAX_HEIGHT = 600;

const CustomImage = ({
  alt,
  width,
  height,
  src,
  base64,
}: ImageProps & { base64?: string }) => {
  let numberWidth = Number(width);
  let numberHeight = Number(height);

  // 이미지의 높이가 최대를 넘어가면 이미지의 비율을 유지하며 크긱를 변경한다.
  if (numberHeight && numberHeight > MAX_HEIGHT) {
    const ratio = MAX_HEIGHT / numberHeight;
    numberWidth = Math.round(numberWidth * ratio);
    numberHeight = Math.round(numberHeight * ratio);
  }

  return (
    <Image
      alt={alt ?? ''}
      width={numberWidth}
      height={numberHeight}
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      sizes="100vw"
      src={src ?? ''}
      priority
    />
  );
};

export default CustomImage;
