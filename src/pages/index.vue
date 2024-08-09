<template>
  <v-container>
    <v-date-picker
      @update:model-value="onDateSelected"
      width="100%"
      color="rgba(255, 0, 0, 0.5)"
      :border="true"
      >
    </v-date-picker>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const selectedDate = ref('');

// NOTE: Select Date
function onDateSelected(date) {
  const getDate = new Date(date)
  const formatDate = getDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  selectedDate.value = formatDate;
}
</script>

<style>
.v-picker-title > div {
  display: none;
}
</style>

