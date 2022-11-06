import type { Source } from './Source';

export interface ArticleFetched {
  content: string | null;
  description: string | null;
  publishedAt: string;
  source: { id: Source['id'] | null; name: Source['name'] };
  title: string;
  url: string;
  urlToImage: string | null;
}

export interface Article extends ArticleFetched {
  id: string;
}
