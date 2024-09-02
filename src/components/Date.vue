<template>
  <v-container>
    <v-date-picker
      v-model="activeDate"
      color="#1E88E6"
      :border="true"
      width="100%"
      >
    </v-date-picker>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';
// Refs
const activeDate = ref([]);

// emits
const emit = defineEmits(['selectedDate'])
// NOTE: Date 포맷팅
function formatDate(date: string): string {
  const getDate = new Date(date)
  const formatDate = getDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  return formatDate;
}

watch(activeDate, (date: any) => {
  // TODO: 글을 작성이 완료될 경우 activeDate에 데이터 추가
  const selectedDate = formatDate(date);
  emit('selectedDate', selectedDate)
})
</script>

<style>
.v-picker-title > div {
  display: none;
}
</style>