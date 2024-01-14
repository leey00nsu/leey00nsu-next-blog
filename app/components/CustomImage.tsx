import Image, { ImageProps } from 'next/image';

const MAX_HEIGHT = 400;

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
    numberWidth = numberWidth * ratio;
    numberHeight = numberHeight * ratio;
  }

  return (
    <Image
      alt={alt ?? ''}
      width={numberWidth}
      height={numberHeight}
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      src={src ?? ''}
      sizes="100vw"
    />
  );
};

export default CustomImage;
