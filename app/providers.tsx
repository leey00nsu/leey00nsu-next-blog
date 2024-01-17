'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

import { KBarProviders } from './components/ui/Kbar-providers';

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <KBarProviders>{children}</KBarProviders>
      </ThemeProvider>
    </NextUIProvider>
  );
}
