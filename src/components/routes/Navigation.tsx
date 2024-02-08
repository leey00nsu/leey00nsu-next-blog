'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FullScreenSpinner } from '../ui/spinner';

interface NavigationProps {
  to: string;
}

// 다른 페이지로 이동하는 컴포넌트
// Suspense 내에서 redirect 버그를 해결하기 위해 사용 : https://github.com/vercel/next.js/issues/59464
const Navigation = ({ to }: NavigationProps) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, []);

  return <FullScreenSpinner />;
};

export default Navigation;
