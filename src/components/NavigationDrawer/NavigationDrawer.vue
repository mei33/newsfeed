<template>
  <v-navigation-drawer
    :permanent="true"
    left
    :floating="true"
    class="flex-shrink-0"
  >
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item @click="$router.back()">
          <v-list-item-title>Go back</v-list-item-title>
        </v-list-item>

        <v-list-item :href="href" target="_blank" rel="noopener noreferrer">
          <v-list-item-title>Go to source</v-list-item-title>
        </v-list-item>

        <v-list-item @click="changeTitleModalOpen">
          <v-list-item-title>Edit title</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'NavigationDrawer',

  props: {
    href: { type: String as PropType<string>, required: true },
  },

  methods: {
    changeTitleModalOpen() {
      this.$emit('change-title-modal-open');
    },
  },
});
</script>
