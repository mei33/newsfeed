import type { Article } from '@/types/Article';
import addIdsToArticles from '@/utils/addIdsToArticles';

import store from '..';
import mockArticles from '../articlesMock';
import mockSources from '../sourcesMock';

const unmockedFetch = global.fetch;

describe('vuex store', () => {
  describe('actions', () => {
    test('loadArticles', async () => {
      global.fetch = () => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          status: 'ok',
          articles: mockArticles,
        }),
      } as Response);

      await store.dispatch('loadArticles');

      expect(store.state.articles).toEqual(addIdsToArticles(mockArticles));

      global.fetch = unmockedFetch;
    });

    test('loadSources', async () => {
      global.fetch = () => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          status: 'ok',
          sources: mockSources,
        }),
      } as Response);

      await store.dispatch('loadSources');

      expect(store.state.sources).toEqual(mockSources);

      global.fetch = unmockedFetch;
    });

    test('changeProperty', () => {
      store.state.articles = [{ ...mockArticles[0], id: '42' }];
      store.state.articlesToRender = [{ ...mockArticles[0], id: '42' }];

      store.dispatch('changeProperty', {
        id: '42',
        key: 'title',
        value: 'updated title',
      });

      expect(store.state.articles[0].title).toEqual('updated title');
      expect(store.state.articlesToRender[0].title).toEqual('updated title');

      store.state.articles = [];
      store.state.articlesToRender = [];
    });

    test('updateVisitedArticlesHistory', () => {
      store.state.visitedArticlesIds = [];
      store.dispatch('updateVisitedArticlesHistory', '42');

      expect(store.state.visitedArticlesIds).toEqual(['42']);
      store.state.visitedArticlesIds = [];
    });

    test('setFilters', () => {
      store.state.articles = mockArticles as unknown as Article[];

      store.dispatch('setFilters', { searchQuery: 'Phillies' });
      expect(store.state.articlesToRender).toEqual([mockArticles[1]]);
      store.state.filters = { searchQuery: '', sourcesIds: [] };

      store.dispatch('setFilters', { sourcesIds: ['the-washington-post'] });
      expect(store.state.articlesToRender).toEqual([mockArticles[2]]);
      store.state.filters = { searchQuery: '', sourcesIds: [] };

      store.dispatch('setFilters', {
        searchQuery: 'attempt',
        sourcesIds: ['cnn'],
      });
      expect(store.state.articlesToRender).toEqual([mockArticles[7]]);
      store.state.filters = { searchQuery: '', sourcesIds: [] };
    });

    test('setErrorText', async () => {
      await store.dispatch('setErrorText', 'some error text');

      expect(store.state.errorText).toEqual('some error text');
    });
  });
});
