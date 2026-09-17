export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'World' | 'Tech' | 'Business' | 'Culture' | 'Opinion';
  summary: string;
  content: string;
  coverImage: string;
  coverPositionX?: number;
  coverPositionY?: number;
  coverScale?: number;
  author: string;
  publishedAt: string;
  isBreaking?: boolean;
}