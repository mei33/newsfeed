<template>
  <article>
    <h1 class="mb-6">{{ title }}</h1>
    <img
      v-if="urlToImage"
      :src="urlToImage"
      class="mb-4 d-block"
      style="max-width: 100%; min-height: 100px"
      :alt="title"
    />
    <time class="mb-4">{{ publishedAt }}</time>
    <p v-if="description">{{ description }}</p>
    <p v-if="content">{{ content }}</p>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'ArticleDetails',

  props: {
    content: {
      type: String as PropType<string | null>,
      default: null,
    },
    description: {
      type: String as PropType<string | null>,
      default: null,
    },
    href: {
      type: String as PropType<string>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
    publishedAt: {
      type: String as PropType<string>,
      required: true,
    },
    urlToImage: {
      type: String as PropType<string | null>,
      default: null,
    },
  },
});
</script>
