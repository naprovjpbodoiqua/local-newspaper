'use client';
import { useState } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import { X, Key } from 'lucide-react';

interface AdminUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminUnlockModal({ isOpen, onClose }: AdminUnlockModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const { activateWithPin } = useAdmin();

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (activateWithPin(pin)) {
      setError(false);
      setPin('');
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-sm w-full p-6 border border-black shadow-xl font-sans">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Key className="w-4 h-4" /> Kích hoạt quyền Quản Trị
          </div>
          <button onClick={onClose}><X className="w-4 h-4 text-neutral-500" /></button>
        </div>
        <form onSubmit={handleUnlock} className="space-y-3">
          <p className="text-xs text-neutral-500">
            Nhập mã PIN bí mật (Mặc định: <code className="bg-neutral-100 px-1 font-mono">123456</code>)
          </p>
          <input
            type="password"
            autoFocus
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••••"
            className="w-full text-center tracking-widest text-lg border p-2 border-neutral-400 focus:outline-black"
          />
          {error && <p className="text-xs text-red-600">Mã PIN không chính xác.</p>}
          <button
            type="submit"
            className="w-full py-2 bg-black text-white text-sm font-medium hover:bg-neutral-800 transition"
          >
            Mở khóa Admin
          </button>
        </form>
      </div>
    </div>
  );
}