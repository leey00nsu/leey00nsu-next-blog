import { getPlaiceholder } from 'plaiceholder';

/**
 * image url를 받아서 이미지의 메타데이터를 생성합니다.
 * @param imageUrl 
 * @returns 
 */
export default async function getMetadata(imageUrl: string) {
  const res = await fetch(imageUrl);

  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
  }

  const buffer = await res.arrayBuffer();

  // const { metadata } = await lqip(Buffer.from(buffer));
  // return { metadata };
  const { base64, metadata } = await getPlaiceholder(Buffer.from(buffer), {
    size: 8,
  });

  return { base64, metadata };
}
