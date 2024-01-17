import Image from 'next/image';

import getMetadata from '@/app/libs/getMetadata';

const GithubChart = async () => {
  const { base64, metadata } = await getMetadata(
    'https://ghchart.rshah.org/086ab6/leey00nsu',
  );

  return (
    <Image
      width={metadata?.width}
      height={metadata?.height}
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      src="https://ghchart.rshah.org/086ab6/leey00nsu"
      alt="leey00nsu github chart"
      unoptimized
      priority
    />
  );
};

export default GithubChart;
