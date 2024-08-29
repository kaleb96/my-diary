<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useAuthStore } from './stores/auth';

onBeforeMount(() =>{
   const authStore = useAuthStore();
})
</script>
