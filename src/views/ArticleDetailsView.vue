<template>
  <v-row v-if="article">
    <v-col cols="12" md="3" lg="2">
      <NavigationDrawer :href="article.url" @change-title-modal-open="changeTitleModalOpen" />
    </v-col>

    <v-dialog width="500" v-model="isPropertyModalVisible">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Enter new title</v-card-title>
        <v-form ref="form" v-model="isPropertyFormValid" lazy-validation>
          <v-card-text>
            <v-text-field v-model="titleEdited" :rules="rules" />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" :disabled="!isPropertyFormValid" text @click="changeTitle"
              >Apply</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-col cols="12" md="9" lg="10">
      <ArticleDetails
        :content="article.content"
        :description="article.description"
        :href="article.url"
        :title="article.title"
        :publishedAt="getFormattedDate(article.publishedAt)"
        :urlToImage="article.urlToImage"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

import ArticleDetails from '@/components/ArticleDetails/ArticleDetails.vue';
import type { Article } from '@/types/Article';
import getFormattedDate from '@/utils/getFormattedDate';
import NavigationDrawer from '@/components/NavigationDrawer/NavigationDrawer.vue';

export default defineComponent({
  name: 'ArticleDetailsView',

  components: {
    NavigationDrawer,
    ArticleDetails,
  },

  methods: {
    ...mapActions(['loadArticles', 'changeProperty', 'setErrorText']),

    changeTitleModalOpen() {
      this.isPropertyModalVisible = true;
    },

    changeTitle() {
      this.changeProperty({
        id: this.id,
        key: 'title',
        value: this.titleEdited,
      });
      this.isPropertyModalVisible = false;
    },

    getFormattedDate,
  },

  data() {
    const maxTitleLength = 255;

    return {
      id: this.$route.params.id,
      isPropertyModalVisible: false,
      isPropertyFormValid: true,
      rules: [
        (value: string) => value.length > 0 || 'Enter a title please',
        (value: string) => value.length <= maxTitleLength || `A maximum of ${maxTitleLength} characters is allowed`,
      ],
      titleEditedInner: '',
    };
  },

  computed: {
    article(): Article | undefined {
      const article = (this.$store.state.articles as Article[]).find(
        (articleItem) => articleItem.id === this.id,
      );

      if (!article) {
        this.setErrorText(`Article with id ${this.id} is not found`);
      }

      return article;
    },

    titleEdited: {
      get(): string {
        return (this.titleEditedInner || this.article?.title) ?? '';
      },

      set(value: string) {
        this.titleEditedInner = value;
      },
    },
  },
});
</script>
