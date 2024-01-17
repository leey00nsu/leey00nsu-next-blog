import { getPlaiceholder } from 'plaiceholder';

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
