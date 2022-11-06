type Fetched<T> = { status: 'ok' } & ({ articles: T } | { sources: T });
type ErrorOnFetch = { status: 'error'; code: string; message: string };

export default function callApi<T>(
  url: string,
  key: 'articles' | 'sources',
): Promise<Fetched<T>> | ErrorOnFetch {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok') {
        return data[key as keyof Fetched<T>];
      }

      throw new Error(`${data.code} – ${data.message}`);
    });
}
