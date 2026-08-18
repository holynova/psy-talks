import type { Metadata } from "next";
import "./globals.css";

const siteBasePath = process.env.GITHUB_PAGES === "1" ? "/psy-talks" : "";

export const metadata: Metadata = {
  title: "助人对话练习册｜心理咨询常见对话技巧",
  description:
    "把心理咨询常见对话微技能拆成可观察、可练习、可复盘的移动端学习地图。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${siteBasePath}/favicon.svg`,
    shortcut: `${siteBasePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
