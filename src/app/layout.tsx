import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Footer from '../components/ui/footer/Footer';
import Header from '../components/ui/header/Header';
import './globals.css';
import Providers from './providers';

const pretendard = localFont({
  src: [
    {
      path: 'fonts/Pretendard-Thin.subset.woff2',
      weight: '100',
    },
    {
      path: 'fonts/Pretendard-ExtraLight.subset.woff2',
      weight: '200',
    },
    {
      path: 'fonts/Pretendard-Light.subset.woff2',
      weight: '300',
    },
    {
      path: 'fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
    },
    {
      path: 'fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
    },
    {
      path: 'fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
    },
    {
      path: 'fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
    },
    {
      path: 'fonts/Pretendard-ExtraBold.subset.woff2',
      weight: '800',
    },
    {
      path: 'fonts/Pretendard-Black.subset.woff2',
      weight: '900',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.leey00nsu.site'),
  title: 'leey00nsu 블로그',
  description: 'leey00nsu의 블로그 입니다.',
  verification: {
    google: 'usvYSsAq91N1AX9yxY09ip-DJQhyHytLAfnDZ_YMQnM',
  },
  robots: {
    index: true,
    googleBot: {
      index: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={pretendard.variable}>
      <body className="bg-default-100/70 font-pretendard text-foreground">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-HC12NVRKQC" />
    </html>
  );
}
