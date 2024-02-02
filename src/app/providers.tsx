'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

import { KBarProviders } from '../components/ui/Kbar-providers';

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider attribute="class" enableSystem defaultTheme="light">
        <SessionProvider>
          <KBarProviders>
            <Toaster />
            {children}
          </KBarProviders>
        </SessionProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
