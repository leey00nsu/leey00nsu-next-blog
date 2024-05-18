import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Footer from '../components/ui/footer/Footer';
import Header from '../components/ui/header/Header';
import './globals.css';
import Providers from './providers';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
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
