import { getPlaiceholder } from 'plaiceholder';

export default async function getMetadata(imageUrl: string) {
  const res = await fetch(imageUrl);

  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
  }

  const buffer = await res.arrayBuffer();

  const { base64, metadata } = await getPlaiceholder(Buffer.from(buffer), {
    size: 20,
  });

  return { base64, metadata };
}
