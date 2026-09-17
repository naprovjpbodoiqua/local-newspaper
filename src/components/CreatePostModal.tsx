'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreatePostModal({ isOpen, onClose, onSuccess }: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech',
    summary: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    author: 'Na',
    isBreaking: false,
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onSuccess();
        onClose();
      }
    } catch (err) {
      alert('Đăng bài thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full p-6 shadow-2xl border border-black max-h-[90vh] overflow-y-auto font-sans">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="font-serif text-xl font-bold">Soạn Thảo Bài Báo Mới</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-neutral-500" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block font-bold mb-1">Tiêu đề bài viết</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border p-2 border-neutral-400 focus:outline-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Chuyên mục</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border p-2 border-neutral-400 focus:outline-black bg-white"
              >
                <option value="World">World (Thời sự)</option>
                <option value="Tech">Tech (Công nghệ)</option>
                <option value="Business">Business (Kinh doanh)</option>
                <option value="Culture">Culture (Văn hóa)</option>
                <option value="Opinion">Opinion (Góc nhìn)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Tác giả</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full border p-2 border-neutral-400 focus:outline-black"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Link Ảnh Bìa (URL)</label>
            <input
              type="url"
              required
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className="w-full border p-2 border-neutral-400 focus:outline-black"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Tóm tắt ngắn (Lead)</label>
            <textarea
              required
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full border p-2 border-neutral-400 focus:outline-black"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Nội dung chi tiết</label>
            <textarea
              required
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full border p-2 border-neutral-400 focus:outline-black font-serif"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isBreaking"
              checked={formData.isBreaking}
              onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="isBreaking" className="font-medium text-neutral-800">
              Đặt làm bài Tiêu Điểm chính (Hero Story)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 hover:bg-neutral-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black text-white font-medium hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? 'Đang xuất bản...' : 'Xuất bản bài báo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}