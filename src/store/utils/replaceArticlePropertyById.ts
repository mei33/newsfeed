import { Article } from '@/types/Article';

export default function replaceArticlePropertyById<K extends keyof Article>({
  articles,
  id,
  key,
  value,
}: {
  articles: Article[];
  id: Article['id'];
  key: K;
  value: Article[K];
}) {
  return articles.map((article) => {
    if (article.id === id) {
      return {
        ...article,
        [key]: value,
      };
    }

    return article;
  });
}
