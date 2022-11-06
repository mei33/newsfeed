import type { ArticleFetched } from '@/types/Article';
import callApi from '@/api/callApi';
import envVariables from '../../dev.env';

export default async function fetchArticles() {
  return callApi<ArticleFetched[]>(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${envVariables.KEY}`,
    'articles',
  );
}
