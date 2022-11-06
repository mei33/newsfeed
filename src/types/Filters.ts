import { Source } from '@/types/Source';

export interface Filters {
  searchQuery: string;
  sourcesIds: Array<Source['id']>;
}
