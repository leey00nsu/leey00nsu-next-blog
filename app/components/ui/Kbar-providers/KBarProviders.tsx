'use client';

import { motion } from 'framer-motion';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from 'kbar';
import { useRouter } from 'next/navigation';
import { FaHome } from 'react-icons/fa';
import { IoDocuments } from 'react-icons/io5';

import KBarInitializer from './KBarInitializer';
import RenderResults from './RenderResults';

interface KBarProvidersProps {
  children: React.ReactNode;
}

const KBarProviders = ({ children }: KBarProvidersProps) => {
  const router = useRouter();

  const actions = [
    {
      id: 'homeAction',
      name: '홈',
      shortcut: ['H'],
      keywords: '홈',
      section: 'Navigation',
      perform: () => router.push('/'),
      icon: <FaHome />,
      subtitle: '블로그 소개로 이동합니다.',
    },
    {
      id: 'blogAction',
      name: '블로그',
      shortcut: ['B', 'L'],
      keywords: '블로그',
      section: 'Navigation',
      perform: () => router.push('/blog'),
      icon: <IoDocuments />,
      subtitle: '블로그 목록으로 이동합니다.',
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 h-full w-full bg-foreground/50 backdrop-blur"
          />
          <KBarAnimator className="w-full max-w-[600px] overflow-hidden rounded-lg bg-background text-foreground shadow-lg">
            <KBarSearch
              defaultPlaceholder="검색어를 입력하세요."
              className="w-full border-none bg-background px-3 py-4 text-foreground outline-none"
            />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <KBarInitializer />
      {children}
    </KBarProvider>
  );
};

export default KBarProviders;
