import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export const metadata: Metadata = {
  title: { default: "健康生活指南 · 饮食、运动、睡眠、心理一站掌握", template: "%s · 健康生活指南" },
  description: "基于权威来源的健康生活科普：合理膳食、规律运动、优质睡眠、心理健康、体重管理与疾病预防，附 BMI 与个性化健康指南工具。",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.theme==='dark')document.documentElement.classList.add('dark')}catch(e){}` }} /></head>
      <body className="flex min-h-dvh flex-col bg-stone-50 text-stone-900 dark:bg-[#0a0a0a] dark:text-white">
        <SiteHeader /><main className="flex-1 pb-16 md:pb-0">{children}</main><Footer /><MobileTabBar />
      </body>
    </html>
  );
}
