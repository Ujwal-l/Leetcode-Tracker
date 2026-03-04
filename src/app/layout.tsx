import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'LeetCode Problem Tracker',
  description:
    'Master FAANG interview problems with a structured learning curriculum.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100'>
        <Header />
        {children}
      </body>
    </html>
  );
}
