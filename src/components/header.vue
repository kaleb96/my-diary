<template>
  <div>
    <v-app-bar>
      <v-app-bar-title text="Header"/>
      <!-- 임시 -->
      <v-btn @click="toLogin">router-to</v-btn>
    </v-app-bar>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

function toLogin() {
  router.push('/login');
}
</script>