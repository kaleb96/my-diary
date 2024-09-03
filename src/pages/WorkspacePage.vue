<template>
  <Date v-if="!showWriter" @selected-date="getSelectDate"></Date>
  <Editor 
    @save-data="hideEditor"
    @show-editor="hideEditor" 
    :selected-date="selectedDate" v-else ></Editor>
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
const selectedDate = ref('');

// NOTE: Emit 리시버
// 선택된 날짜 저장
function getSelectDate(payload: any) {
  selectedDate.value = payload
  showWriter.value = true;
}
// 에디터 to 캘린더
function hideEditor(payload: any) {
  if(payload) {
    showWriter.value = false;
  }
}
</script>