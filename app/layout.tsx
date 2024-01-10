import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "fonts/Pretendard-Thin.woff",
      weight: "100",
    },
    {
      path: "fonts/Pretendard-ExtraLight.woff",
      weight: "200",
    },
    {
      path: "fonts/Pretendard-Light.woff",
      weight: "300",
    },
    {
      path: "fonts/Pretendard-Regular.woff",
      weight: "400",
    },
    {
      path: "fonts/Pretendard-Medium.woff",
      weight: "500",
    },
    {
      path: "fonts/Pretendard-SemiBold.woff",
      weight: "600",
    },
    {
      path: "fonts/Pretendard-Bold.woff",
      weight: "700",
    },
    {
      path: "fonts/Pretendard-ExtraBold.woff",
      weight: "800",
    },
    {
      path: "fonts/Pretendard-Black.woff",
      weight: "900",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "leey00nsu 블로그",
  description: "leey00nsu의 블로그 입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        {children}
      </body>
    </html>
  );
}
