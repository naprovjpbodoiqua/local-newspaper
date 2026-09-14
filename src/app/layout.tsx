import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Local Chronicle - Báo Điện Tử Tự Do',
  description: 'Trang thông tin báo chí trực tuyến phong cách Editorial cổ điển.',
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
          <p>© 2026 The Local Chronicle. Prototype chạy Local hoàn chỉnh.</p>
        </footer>
      </body>
    </html>
  );
}