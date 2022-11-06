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
import ArticleDetails from '@/components/ArticleDetails/ArticleDetails.vue';
import getFormattedDate from '@/utils/getFormattedDate';
import NavigationDrawer from '@/components/NavigationDrawer/NavigationDrawer.vue';
import articlesMock from '@/store/articlesMock';

export default defineComponent({
  name: 'ArticleDetailsView',

  components: {
    NavigationDrawer,
    ArticleDetails,
  },

  methods: {
    changeTitleModalOpen() {
      this.isPropertyModalVisible = true;
    },

    changeTitle() {
      console.log(this.titleEdited);
      this.isPropertyModalVisible = false;
    },

    getFormattedDate,
  },

  data() {
    const maxTitleLength = 255;

    return {
      article: { ...articlesMock[0], id: 42 },
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
