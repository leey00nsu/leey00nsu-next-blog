import { FaRegSadCry } from 'react-icons/fa';

export default function NotFound() {
  return (
    <main className="min-w-screen flex min-h-[calc(100svh-128px)] flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <FaRegSadCry className="h-20 w-20" />
        <h2 className="text-lg font-bold sm:text-4xl">잘못된 접근입니다.</h2>
      </div>
    </main>
  );
}
