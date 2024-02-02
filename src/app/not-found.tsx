import { FaRegSadCry } from 'react-icons/fa';

export default function NotFound() {
  return (
    <main className="min-w-screen flex min-h-[calc(100svh-128px)] flex-col items-center justify-center">
      <div className="prose-custom prose prose-slate flex flex-col items-center justify-center gap-4 dark:prose-invert">
        <FaRegSadCry className="h-20 w-20" />
        <h1>잘못된 접근입니다.</h1>
      </div>
    </main>
  );
}
