import getMetadata from '@/app/libs/getMetadata';

import { CustomImage } from '../ui/mdx-components';

const GithubChart = async () => {
  const { base64, metadata } = await getMetadata(
    'https://ghchart.rshah.org/086ab6/leey00nsu',
  );

  return (
    <CustomImage
      alt="leey00nsu github chart"
      width={metadata.width}
      height={metadata.height}
      src="https://ghchart.rshah.org/086ab6/leey00nsu"
      base64={base64}
      keepBlur={false}
      unoptimized
    />
  );
};

export default GithubChart;
