<template>
  <v-layout>
    <Header />
    <v-main>
      <div class="d-flex justify-center pa-2 ma-2">
        <v-row no-gutters>
        <v-col class="bg-surface-variant pa-2 ma-2" cols="3">
          shorts
        </v-col>
        <v-col class="bg-surface pa-2 ma-2">
          <router-view /> 
        </v-col>
        <v-col class="bg-surface-variant pa-2 ma-2" cols="1">emptySpace</v-col>
      </v-row>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import Header from '@/components/header.vue'
</script>