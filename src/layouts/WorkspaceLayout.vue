<template>
  <v-layout>
    <div class="d-flex" style="flex-direction: column;">
      <Header />
      <v-container class="border-lg">
        <router-view></router-view>
      </v-container>
    </div>
  </v-layout>
</template>

<script setup>
import Header from '@/components/header.vue'
</script>