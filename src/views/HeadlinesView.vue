<template>
  <div>
    <div class="d-flex justify-space-between">
      <h1 class="mb-1">Headlines</h1>
      <v-btn color="primary" @click="handleFiltersModalOpen">Filter</v-btn>
    </div>

    <v-dialog v-model="isFiltersModalVisible" scrollable width="500" max-width="90%">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Filter articles by text</v-card-title>
        <v-card-text style="min-height: 70px">
          <v-text-field v-model="searchQuery" placeholder="Query text" hide-details />
        </v-card-text>

        <template v-if="sources.length">
          <v-card-title class="text-h5 grey lighten-2">Select sources to show</v-card-title>
          <v-card-text>
            <v-checkbox
              v-for="source in sources"
              v-model="sourcesSelected"
              :value="source.id"
              :label="source.name"
              :key="source.id"
            />
          </v-card-text>
        </template>

        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" text @click="handleApplyFiltersAbort">Cancel</v-btn>
          <v-btn color="primary" text @click="handleApplyFiltersFinish">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <HeadlinesList v-if="articles.length" :articles="articles" @nav-to="handleNavArticle" />
    <template v-else>
      <v-alert prominent type="info">
        <v-row align="center">
          <v-col class="grow">No articles to display</v-col>
        </v-row>
      </v-alert>
    </template>

    <template v-if="visitedArticles.length">
      <h1 class="mb-1">Visited pages</h1>
      <HeadlinesList :articles="visitedArticles" @nav-to="handleNavArticle" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

import type { Article } from '@/types/Article';
import type { Filters } from '@/types/Filters';
import type { Source } from '@/types/Source';
import HeadlinesList from '@/components/HeadlinesList/HeadlinesList.vue';

export default defineComponent({
  name: 'HeadlinesView',

  components: {
    HeadlinesList,
  },

  data() {
    return {
      isFiltersModalVisible: false,
      sourcesSelected: [] as Array<Source['id']>,
      searchQueryInner: '',
    };
  },

  computed: {
    articles(): Article[] {
      return this.$store.state.articlesToRender;
    },

    articlesMap(): Record<Article['id'], Article> {
      return this.articles.reduce<Record<Article['id'], Article>>((acc, cur) => {
        if (cur.id) {
          acc[cur.id] = cur;
        }

        return acc;
      }, {});
    },

    searchQuery: {
      get(): string {
        return this.searchQueryInner;
      },

      set(value: string) {
        this.searchQueryInner = value;
      },
    },

    sources(): Source[] {
      return this.$store.state.sources;
    },

    visitedArticles(): Article[] {
      return (this.$store.state.visitedArticlesIds as Array<Article['id']>).map(
        (articleId) => this.articlesMap[articleId],
      );
    },
  },

  methods: {
    ...mapActions(['loadArticles', 'updateVisitedArticlesHistory', 'setFilters']),

    handleNavArticle(id: Article['id']) {
      this.updateVisitedArticlesHistory(id);
    },

    handleFiltersModalOpen() {
      this.isFiltersModalVisible = true;
    },

    handleApplyFiltersAbort() {
      this.isFiltersModalVisible = false;
    },

    handleApplyFiltersFinish() {
      const filters: Filters = {
        searchQuery: this.searchQuery,
        sourcesIds: this.sourcesSelected,
      };

      this.setFilters(filters);

      this.isFiltersModalVisible = false;
    },
  },
});
</script>
