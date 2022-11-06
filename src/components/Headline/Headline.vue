<template>
  <v-card height="100%">
    <article style="height: 100%">
      <v-hover v-slot="{ hover }">
        <a :href="url" class="white--text text-decoration-none" @click.prevent="handleNavTo">
          <v-img
            :src="urlToImage"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="100%"
            :style="{
              opacity: hover ? 0.7 : 1,
              backgroundColor: urlToImage ? undefined : '#1976d2',
            }"
          >
            <v-card-title style="word-break: break-word">
              {{ title }}
            </v-card-title>
            <v-card-subtitle>
              {{ publishedAt }}
            </v-card-subtitle>
            <v-card-text v-if="description">
              {{ description }}
            </v-card-text>
          </v-img>
        </a>
      </v-hover>
    </article>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'Headline',

  props: {
    description: {
      type: String as PropType<string | null>,
      default: null,
    },
    url: {
      type: String as PropType<string>,
      required: true,
    },
    id: {
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

  methods: {
    handleNavTo() {
      this.$router.push(`${this.url}`);

      this.$emit('nav-to', this.id);
    },
  },
});
</script>
