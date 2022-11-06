import md5 from 'md5';

import { Article, ArticleFetched } from '@/types/Article';

export default function addIdsToArticles(articlesFetched: ArticleFetched[]): Article[] {
  return articlesFetched.map((article) => ({
    ...article,
    id: md5(article.url),
  }));
}
