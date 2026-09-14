'use client';
import Link from 'next/link';
import { Article } from '@/types/post';
import { useAdmin } from '@/hooks/useAdmin';
import { Trash2 } from 'lucide-react';

interface NewsGridProps {
  articles: Article[];
  onDeleteArticle: (id: string) => void;
}

export default function NewsGrid({ articles, onDeleteArticle }: NewsGridProps) {
  const { isAdmin } = useAdmin();

  if (!articles || articles.length === 0) {
    return (
      <div className="py-20 text-center text-neutral-500 font-serif">
        Chưa có bài báo nào. Hãy kích hoạt Admin và đăng bài đầu tiên.
      </div>
    );
  }

  const breakingArticle = articles.find((a) => a.isBreaking) || articles[0];
  const sideArticles = articles.filter((a) => a.id !== breakingArticle.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-neutral-300">
        <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200 lg:pr-8 pb-6 lg:pb-0 relative">
          <div>
            <span className="text-red-700 text-xs font-bold font-sans tracking-widest uppercase mb-1 block">
              {breakingArticle.category} • Tiêu điểm
            </span>
            <Link href={`/article/${breakingArticle.id}`}>
              <h2 className="font-serif text-2xl md:text-4xl font-bold leading-tight mb-3 hover:underline">
                {breakingArticle.title}
              </h2>
            </Link>
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-4">
              {breakingArticle.summary}
            </p>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 mb-3">
            <img
              src={breakingArticle.coverImage}
              alt={breakingArticle.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-neutral-500 font-sans">
            <span>Tác giả: {breakingArticle.author}</span>
            {isAdmin && (
              <button
                onClick={() => onDeleteArticle(breakingArticle.id)}
                className="text-red-600 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa bài
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6 divide-y divide-neutral-200">
          {sideArticles.slice(0, 3).map((item) => (
            <div key={item.id} className="pt-4 first:pt-0">
              <span className="text-xs font-bold font-sans text-neutral-500 uppercase">
                {item.category}
              </span>
              <Link href={`/article/${item.id}`}>
                <h3 className="font-serif text-lg md:text-xl font-bold leading-snug my-1 hover:underline">
                  {item.title}
                </h3>
              </Link>
              <p className="text-neutral-600 text-xs md:text-sm line-clamp-2 leading-relaxed mb-2">
                {item.summary}
              </p>
              <div className="flex justify-between items-center text-[11px] text-neutral-400 font-sans">
                <span>{item.author}</span>
                {isAdmin && (
                  <button
                    onClick={() => onDeleteArticle(item.id)}
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Xóa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {sideArticles.length > 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {sideArticles.slice(3).map((item) => (
            <div key={item.id} className="border-r last:border-r-0 border-neutral-200 pr-4">
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 mb-2">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-[11px] font-bold font-sans uppercase text-neutral-500">
                {item.category}
              </span>
              <Link href={`/article/${item.id}`}>
                <h4 className="font-serif font-bold text-base my-1 hover:underline">
                  {item.title}
                </h4>
              </Link>
              <p className="text-neutral-600 text-xs line-clamp-2">{item.summary}</p>
              {isAdmin && (
                <button
                  onClick={() => onDeleteArticle(item.id)}
                  className="mt-2 text-xs text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Xóa
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}