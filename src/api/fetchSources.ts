import callApi from '@/api/callApi';
import type { Source } from '@/types/Source';

import envVariables from '../../dev.env';

export default async function fetchSources() {
  return callApi<Source[]>(
    `https://newsapi.org/v2/sources?apiKey=${envVariables.KEY}`,
    'sources',
  );
}
