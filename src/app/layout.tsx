import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const serifFont = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-custom-serif',
});

const sansFont = Inter({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-custom-sans',
});

export const metadata: Metadata = {
  title: 'Nhịp Đập Thủ Đô',
  description: 'Trang thông tin báo chí trực tuyến .',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col justify-between antialiased">
        {children}
        <footer className="border-t border-neutral-300 py-8 text-center text-xs text-neutral-500 font-serif mt-16">
          <p>© Nhịp Đập Thủ Đô.</p>
        </footer>
      </body>
    </html>
  );
}