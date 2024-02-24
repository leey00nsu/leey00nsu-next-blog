'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import tw from '@/src/libs/tw';

import { ZoomableImage } from '../zoomable-image';

const MAX_HEIGHT = 600;

const CustomImage = ({
  alt,
  width,
  height,
  src,
  base64,
  keepBlur = true,
  dropShadow = true,
  zoomable = true,
  ...props
}: ImageProps & {
  base64?: string;
  keepBlur?: boolean;
  dropShadow?: boolean;
  zoomable?: boolean;
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
          'absolute inset-0 -z-10 m-0 opacity-100 blur-md dark:blur-none',
          isMounted && !keepBlur && 'opacity-0 transition-opacity',
        )}
        style={{
          aspectRatio: `${numberWidth} / ${numberHeight}`,
        }}
        onLoad={() => {
          if (props.unoptimized) return; // svg 이미지는 블러를 초기화하지 않는다.
          setIsMounted(false);
        }}
        src={base64!}
        priority
      />

      {/* original image */}
      {zoomable && (
        <span
          className={tw(
            isMounted ? 'opacity-100 transition-opacity' : 'opacity-0',
          )}
        >
          <ZoomableImage
            {...props}
            options={{
              background: 'rgba(0, 0, 0, 0.5)',
            }}
            className="m-0"
            key={src as string}
            alt={alt ?? ''}
            width={numberWidth}
            height={numberHeight}
            src={src}
            onLoad={() => setIsMounted(true)}
          />
        </span>
      )}
      {!zoomable && (
        <Image
          {...props}
          key={src as string}
          alt={alt ?? ''}
          width={numberWidth}
          height={numberHeight}
          src={src}
          onLoad={() => setIsMounted(true)}
          className={tw(
            'm-0',
            isMounted ? 'opacity-100 transition-opacity' : 'opacity-0',
          )}
        />
      )}
    </span>
  );
};

export default CustomImage;
