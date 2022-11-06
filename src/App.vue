<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="text-h4" role="presentation">News</div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>
