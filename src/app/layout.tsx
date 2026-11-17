import type { Metadata, Viewport } from "next";
import DevInspector from "@/components/DevInspector";
import "./globals.css";

export const metadata: Metadata = {
  title: "링크나무",
  description: "내 모든 링크를 한 페이지에 모아 두고, 하나의 링크로 공유하는 서비스",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {children}
        {/* 개발 모드에서만 보이는 '클릭해서 수정 요청' 도구. Vercel 배포에는 포함되지 않음 */}
        {process.env.NODE_ENV === "development" && <DevInspector />}
      </body>
    </html>
  );
}
