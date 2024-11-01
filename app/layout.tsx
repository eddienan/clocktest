import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '自定义风格数字时钟',
  description: '一个可自定义样式的数字时钟应用',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
} 