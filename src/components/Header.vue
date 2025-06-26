<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>

<template>
  <header class="bg-blue-600 text-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">Оренда приміщень</router-link>
      <nav class="flex gap-6">
        <router-link
          to="/"
          class="hover:underline transition-all"
          :class="{ 'font-bold underline': $route.path === '/' }"
        >
          Головна
        </router-link>
        <router-link
          to="/map"
          class="hover:underline transition-all"
          :class="{ 'font-bold underline': $route.path === '/map' }"
        >
          Карта
        </router-link>
      </nav>
    </div>
  </header>
</template>
