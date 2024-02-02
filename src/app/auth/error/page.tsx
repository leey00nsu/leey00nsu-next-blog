import { FaRegSadCry } from 'react-icons/fa';

import LogoutButton from '@/src/components/auth/LogoutButton';

const Error = async () => {
  return (
    <main className="min-w-screen flex min-h-[calc(100svh-128px)] flex-col items-center justify-center">
      <div className="prose-custom prose prose-slate flex flex-col items-center justify-center gap-4 dark:prose-invert">
        <FaRegSadCry className="h-20 w-20" />
        <h1>관리자만 접근 가능한 페이지입니다.</h1>
        <LogoutButton />
      </div>
    </main>
  );
};

export default Error;
