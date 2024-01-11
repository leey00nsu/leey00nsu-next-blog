import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <p className="text-3xl font-pretendard font-normal">하이하이퉭하이</p>
      <p className="text-3xl font-pretendard font-thin">하이하이퉭하이</p>
      <p className="text-3xl font-pretendard font-extralight">하이하이퉭하이</p>
      <p className="text-3xl font-pretendard font-medium">하이하이퉭하이</p>
      <p className="text-3xl font-pretendard font-bold">하이하이퉭하이</p>
      <p className="text-3xl font-pretendard font-semibold">하이하이퉭하이</p>
      <p className="text-3xl font-pretendard font-black">하이하이퉭하이</p>
      <p className="text-3xl font-sans font-normal">하이하이퉭하이</p>
      <Link href="/blog">Blog</Link>
    </main>
  );
}
