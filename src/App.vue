<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="text-h4" role="presentation">News</div>
    </v-app-bar>

    <v-main>
      <template v-if="loadingStatus === 'error'">
        <v-alert prominent type="error">
          <v-row align="center">
            <v-col class="grow">
              {{ errorText }}
            </v-col>
            <v-col class="shrink">
              <v-btn href="https://newsapi.org/" target="_blank" rel="noopener noreferrer"
                >Get new key</v-btn
              >
            </v-col>
          </v-row>
        </v-alert>
      </template>

      <template v-else-if="loadingStatus === 'loaded' && errorText">
        <v-alert prominent type="error">
          <v-row align="center">
            <v-col class="grow">
              {{ errorText }}
            </v-col>
          </v-row>
        </v-alert>
      </template>

      <template v-if="loadingStatus === 'loading'">
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col
              ><div style="display: flex; justify-content: center">
                <v-progress-circular :size="100" :width="10" color="primary" indeterminate /></div
            ></v-col>
          </v-row>
        </v-container>
      </template>

      <template v-else-if="loadingStatus === 'loaded'">
        <v-container fluid>
          <router-view />
        </v-container>
      </template>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'App',

  created() {
    this.loadArticles();
    this.loadSources();
  },

  computed: {
    errorText() {
      return this.$store.state.errorText;
    },

    loadingStatus() {
      return this.$store.state.loadingStatus;
    },
  },

  methods: {
    ...mapActions(['loadArticles', 'loadSources']),
  },
});
</script>
