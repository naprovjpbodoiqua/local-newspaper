export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'World' | 'Tech' | 'Business' | 'Culture' | 'Opinion';
  summary: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  isBreaking?: boolean;
}