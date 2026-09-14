'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import NewsGrid from '@/components/NewsGrid';
import CreatePostModal from '@/components/CreatePostModal';
import AdminUnlockModal from '@/components/AdminUnlockModal';
import { Article } from '@/types/post';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isPinModalOpen, setPinModalOpen] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error('Lỗi nạp bài báo', err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài báo này?')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      fetchArticles();
    }
  };

  return (
    <main>
      <Header
        onOpenCreateModal={() => setCreateModalOpen(true)}
        onOpenPinModal={() => setPinModalOpen(true)}
      />
      <NewsGrid articles={articles} onDeleteArticle={handleDelete} />
      
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={fetchArticles}
      />
      <AdminUnlockModal
        isOpen={isPinModalOpen}
        onClose={() => setPinModalOpen(false)}
      />
    </main>
  );
}