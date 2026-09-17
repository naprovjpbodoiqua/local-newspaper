import Link from 'next/link';
import { Article } from '@/types/post';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const youtubeUrlPattern = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})([^\s)]*)?/g;
const directMediaUrlPattern = /^https?:\/\/[^\s<>()]+$/;

function getDirectMediaType(url: string) {
  const path = url.split(/[?#]/)[0].toLowerCase();

  if (/\.(avif|gif|jpe?g|png|webp)$/.test(path)) return 'image';
  if (/\.(m4v|mov|mp4|ogv|ogg|webm)$/.test(path)) return 'video';
  return null;
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0` : null;
}

async function getArticle(id: string): Promise<Article | null> {
  const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');
  if (!fs.existsSync(dataFilePath)) return null;
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  const posts: Article[] = JSON.parse(fileData || '[]');
  return posts.find((p) => p.id === id) || null;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const content = article.content
    .replace(
      youtubeUrlPattern,
      (_, videoId, query) => `[Xem video trên YouTube](https://www.youtube.com/watch?v=${videoId}${query || ''})`
    )
    .split('\n')
    .map((line) => {
      const url = line.trim();
      const mediaType = directMediaUrlPattern.test(url) ? getDirectMediaType(url) : null;

      if (mediaType === 'image') return `![Ảnh trong bài viết](${url})`;
      if (mediaType === 'video') return `[Xem video](${url})`;
      return line;
    })
    .join('\n');

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

      <div className="aspect-[16/9] w-full overflow-hidden bg-white mb-8">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-contain"
          style={{
            objectPosition: 'center',
            transform: `translate(${50 - (article.coverPositionX ?? 50)}%, ${50 - (article.coverPositionY ?? 50)}%) scale(${article.coverScale ?? 1})`,
          }}
        />
      </div>

      <div className="prose prose-lg max-w-none text-neutral-900">
        <ReactMarkdown
          components={{
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt || ''}
                className="block w-full h-auto my-8"
              />
            ),
            a: ({ href, children }) => {
              const embedUrl = href ? getYoutubeEmbedUrl(href) : null;
              const mediaType = href ? getDirectMediaType(href) : null;

              if (embedUrl) {
                return (
                  <span className="block aspect-video my-8 overflow-hidden bg-neutral-100">
                    <iframe
                      src={embedUrl}
                      title="Video trong bài viết"
                      className="w-full h-full"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </span>
                );
              }

              if (mediaType === 'video') {
                return (
                  <video controls preload="metadata" className="w-full my-8 bg-black">
                    <source src={href} />
                    Trình duyệt không hỗ trợ phát video này.
                  </video>
                );
              }

              return (
                <a href={href} target="_blank" rel="noreferrer">
                  {children}
                </a>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}