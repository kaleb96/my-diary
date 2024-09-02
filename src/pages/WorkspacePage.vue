<template>
  <Date v-if="!showWriter"@selected-date="getSelectedDate"></Date>
  <Editor v-else></Editor>
  <!-- <v-virtual-scroll
    :height="300"
  >
  </v-virtual-scroll> -->
</template>

<script setup lang="ts">
import Date from '@/components/Date.vue'
import Editor from '@/components/Editor.vue'
import { ref } from 'vue';

// Refs
const showWriter = ref<boolean>(false);
function getSelectedDate(payload: any) {
  if(payload) {
    showWriter.value = true;
  }
}
</script>