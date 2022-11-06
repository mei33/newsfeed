<template>
  <v-row class="mb-6">
    <v-col v-for="(article, index) in articles" cols="12" md="4" sm="6" :key="index">
      <Headline
        :description="article.description"
        :url="`/articles/${article.id}`"
        :id="article.id"
        :title="article.title"
        :publishedAt="getFormattedDate(article.publishedAt)"
        :urlToImage="article.urlToImage"
        v-on="$listeners"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import Headline from '@/components/Headline/Headline.vue';
import type { Article } from '@/types/Article';
import getFormattedDate from '@/utils/getFormattedDate';

export default defineComponent({
  name: 'HeadlinesList',

  components: {
    Headline,
  },

  props: {
    articles: { type: Array as PropType<Article[]>, required: true },
  },

  methods: {
    getFormattedDate,
  },
});
</script>
