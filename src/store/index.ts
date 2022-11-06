import Vue from 'vue';
import Vuex from 'vuex';
import type { ActionContext } from 'vuex';

import type { Article, ArticleFetched } from '@/types/Article';
import { Filters } from '@/types/Filters';
import type { Source } from '@/types/Source';
import fetchArticles from '@/api/fetchArticles';
import fetchSources from '@/api/fetchSources';
import addIdsToArticles from '@/utils/addIdsToArticles';
import replaceArticlePropertyById from '@/store/utils/replaceArticlePropertyById';

Vue.use(Vuex);

type LoadingStatus = 'loading' | 'loaded' | 'error';

interface State {
  articles: Article[];
  articlesToRender: Article[];
  errorText: string;
  filters: Filters;
  loadingStatus: LoadingStatus;
  sources: Source[];
  visitedArticlesIds: Array<Article['id']>;
}

export default new Vuex.Store<State>({
  state: {
    articles: [],
    articlesToRender: [],
    errorText: '',
    filters: {
      searchQuery: '',
      sourcesIds: [],
    },
    loadingStatus: 'loading',
    sources: [],
    visitedArticlesIds: [],
  },
  getters: {},
  mutations: {
    setArticles(state, fetchedArticles: ArticleFetched[]) {
      const articlesWithIds = addIdsToArticles(fetchedArticles);

      state.articles = articlesWithIds;
      state.articlesToRender = articlesWithIds;
    },

    setSources(state, fetchedSources: Source[]) {
      state.sources = fetchedSources;
    },

    setErrorText(state, errorText: string) {
      state.errorText = errorText;
    },

    setLoadingStatus(state, loadingStatus: LoadingStatus) {
      state.loadingStatus = loadingStatus;
    },

    changeProperty<K extends keyof Article>(
      state: State,
      { id, key, value }: { id: string; key: K; value: Article[K] },
    ) {
      const article = state.articles.find(
        (articleItem) => articleItem.id === id,
      );

      if (!article) {
        return;
      }

      state.articles = replaceArticlePropertyById({
        articles: state.articles,
        key,
        value,
        id,
      });

      state.articlesToRender = replaceArticlePropertyById({
        articles: state.articlesToRender,
        key,
        value,
        id,
      });
    },

    updateVisitedArticlesHistory(state, id: Article['id']) {
      state.visitedArticlesIds.push(id);
    },

    setFilters<T extends keyof Filters>(state: State, filters: Filters) {
      Object.keys(filters).forEach((key) => {
        const filterKey = key as T;

        state.filters[filterKey] = filters[filterKey] as Filters[T];
      });
    },

    filterArticles(state) {
      state.articlesToRender = state.articles.filter((article) => {
        const { searchQuery: searchQueryRaw } = state.filters;
        const searchQuery = searchQueryRaw.trim().toLowerCase();

        let isMatchesSearchQuery = true;

        if (searchQuery) {
          isMatchesSearchQuery = Boolean(
            article.title.toLowerCase().includes(searchQuery)
            || article.content?.toLowerCase().includes(searchQuery)
            || article.description?.toLowerCase().includes(searchQuery),
          );
        }

        let isMatchesSourcesSelected = true;
        const sourcesSelected = state.filters.sourcesIds;

        if (sourcesSelected.length) {
          if (article.source.id) {
            isMatchesSourcesSelected = sourcesSelected.includes(
              article.source.id,
            );
          } else {
            isMatchesSourcesSelected = false;
          }
        }

        return isMatchesSearchQuery && isMatchesSourcesSelected;
      });
    },
  },

  actions: {
    async loadArticles(context) {
      try {
        const articles = await fetchArticles();

        context.commit('setArticles', articles);
        context.commit('setLoadingStatus', 'loaded');
      } catch (error) {
        context.commit('setErrorText', error);
        context.commit('setLoadingStatus', 'error');
      }
    },

    async loadSources(context) {
      try {
        const sources = await fetchSources();

        context.commit('setSources', sources);
      } catch (error) {
        context.commit('setErrorText', error);
        context.commit('setLoadingStatus', 'error');
      }
    },

    changeProperty<K extends keyof Article>(
      context: ActionContext<State, State>,
      payload: { id: Article['id']; key: K; value: NonNullable<Article[K]> },
    ) {
      context.commit('changeProperty', payload);
    },

    updateVisitedArticlesHistory(context, id: Article['id']) {
      context.commit('updateVisitedArticlesHistory', id);
    },

    setFilters(context, filters: Partial<Filters>) {
      context.commit('setFilters', filters);
      context.commit('filterArticles');
    },

    setErrorText(context, errorMessage: string) {
      context.commit('setErrorText', errorMessage);
    },
  },
});
