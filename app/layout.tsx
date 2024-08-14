import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Stock Market Price',
  description:
    "Stay informed with the latest stock market prices in real-time. Our platform provides up-to-date information on stock quotes, market trends, and financial performance of various companies. Whether you're tracking your investments or exploring new opportunities, you can rely on accurate and timely data to make informed decisions. Discover detailed price movements, historical charts, and market analysis to enhance your investment strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased bg-dot-black/[0.1]  dark:bg-dot-white/[0.1]',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
