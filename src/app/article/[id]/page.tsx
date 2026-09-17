import Link from 'next/link';
import { Article } from '@/types/post';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { ArrowLeft } from 'lucide-react';

async function getArticle(id: string): Promise<Article | null> {
  const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');
  if (!fs.existsSync(dataFilePath)) return null;
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  const posts: Article[] = JSON.parse(fileData || '[]');
  return posts.find((p) => p.id === id) || null;
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-serif">
      <Link
        href="/"
        className="inline-flex items-center gap-1  text-green-600 text-xs font-sans uppercase tracking-widest text-neutral-500 hover:text-black mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Trang chủ
      </Link>

      <span className="block text-green-700 font-sans font-bold text-xs uppercase tracking-widest mb-2">
        {article.category}
      </span>

      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
        {article.title}
      </h1>

      <p className="text-lg text-neutral-600 italic leading-relaxed mb-6 font-serif">
        {article.summary}
      </p>

      <div className="flex  text-green-600 items-center justify-between border-y border-neutral-300 py-3 text-xs font-sans text-neutral-500 mb-8">
        <span>Bởi <strong>{article.author}</strong></span>
        <span>{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
      </div>

      <div className="aspect-[16/9] w-full overflow-hidden mb-8">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-lg leading-relaxed space-y-6 text-neutral-900">
        {article.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}