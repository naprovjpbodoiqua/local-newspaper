'use client';
import Link from 'next/link';
import { useAdmin } from '@/hooks/useAdmin';
import { ShieldAlert, LogOut, PlusCircle } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  onOpenPinModal: () => void;
}

export default function Header({ onOpenCreateModal, onOpenPinModal }: HeaderProps) {
  const { isAdmin, deactivateAdmin } = useAdmin();
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="border-b border-black font-serif">
      <div className="max-w-6xl mx-auto px-4 py-1.5 flex justify-between items-center text-xs text-neutral-600 border-b border-neutral-200">
        <span className="capitalize">{currentDate}</span>
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-2 text-green-700 font-sans font-medium">
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Admin Mode
              </span>
              <button
                onClick={onOpenCreateModal}
                className="flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded hover:bg-neutral-800"
              >
                <PlusCircle className="w-3 h-3" /> Đăng bài
              </button>
              <button
                onClick={deactivateAdmin}
                className="hover:underline flex items-center gap-1 ml-1 text-neutral-500"
              >
                <LogOut className="w-3 h-3" /> Thoát
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenPinModal}
              className="text-neutral-400 hover:text-black font-sans transition"
            >
              Admin PIN
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase hover:opacity-90 transition">
            Nhịp Đập Thủ Đô
          </h1>
        </Link>
        <p className="text-[11px] tracking-widest uppercase text-neutral-500 mt-1">
          Ban tin thuong nhat
        </p>
      </div>

      <nav className="max-w-6xl mx-auto px-4 py-2 border-t border-b border-neutral-300 flex justify-center gap-6 text-xs md:text-sm font-sans font-semibold uppercase tracking-wider text-neutral-800 overflow-x-auto">
        <Link href="/" className="hover:underline">Trang chủ</Link>
        <Link href="/" className="hover:underline">Thời sự</Link>
        <Link href="/" className="hover:underline">Công nghệ</Link>
        <Link href="/" className="hover:underline">Kinh doanh</Link>
        <Link href="/" className="hover:underline">Văn hóa</Link>
        <Link href="/" className="hover:underline">Góc nhìn</Link>
      </nav>
    </header>
  );
}