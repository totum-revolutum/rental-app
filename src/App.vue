<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <Header />

  <main class="container mx-auto px-4 py-6">
    <router-view />
  </main>
</template>
