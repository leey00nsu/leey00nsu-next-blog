import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaRegSadCry } from 'react-icons/fa';

const Error = () => {
  return (
    <main className="min-w-screen flex min-h-[calc(100svh-128px)] flex-col items-center justify-center">
      <div className=" flex flex-col items-center justify-center gap-4 ">
        <FaRegSadCry className="h-20 w-20" />
        <h2 className="text-lg font-bold sm:text-4xl">
          관리자만 접근 가능한 페이지입니다.
        </h2>
        <Button
          as={Link}
          size="lg"
          href="/auth/signin"
          color="primary"
          disableRipple
          variant="flat"
        >
          관리자로 로그인
        </Button>
      </div>
    </main>
  );
};

export default Error;
