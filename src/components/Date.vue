<template>
  <v-container>
    <v-date-picker
      v-model="selectDate"
      color="#1E88E6"
      :border="true"
      width="100%"
      >
    </v-date-picker>
  </v-container>
</template>

<script setup lang="ts">
import { getSelectedDates } from '@/assets/databases/workspace';
import { formatDate } from '@/assets/scripts/util';
import { ref, watch, defineEmits, onMounted,} from 'vue';

// Refs
const selectDate = ref([]);

// emits
const emit = defineEmits<{
  (e: 'selectedDate', value: string): void
}>()

// NOTE: DB를 조회하여 작성 기록이 있는 날짜 Highlight
async function getDate() {
  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
  const userId = loginInfo.user_id;
  const response = await getSelectedDates(userId)
  response.forEach(element => {
    const targetElement = document.querySelector(`[data-v-date="${element}"]`)
    if(targetElement) {
      targetElement.classList.add('highlight-date');
    }
  });
}

// Watches
watch(selectDate, (date: any) => {
  // 날짜 선택을 감지하여 에디터로 컴포넌트 변경
  const selectedDate = formatDate(date);
  emit('selectedDate', selectedDate);
})

// LifeCycle
onMounted(async () => {
  getDate();
})
</script>

<style>
.v-picker-title > div {
  display: none;
}

.highlight-date > button {
  background-color: rgb(30, 136, 230);
  color: white;
}
</style>