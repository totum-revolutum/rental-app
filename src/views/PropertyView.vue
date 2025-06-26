<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePropertyStore } from '../stores/propertyStore'

const route = useRoute()
const store = usePropertyStore()

onMounted(() => {
  store.setSelectedId(route.params.id)
})

const property = computed(() => store.selectedProperty)
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <div v-if="property" class="space-y-8">
      <h1 class="text-4xl font-bold text-gray-900">{{ property.name }}</h1>

      <div
        class="w-full h-64 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center"
      >
        <span class="text-gray-500">Зображення приміщення</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white shadow rounded-xl p-6 border">
          <p class="text-sm text-gray-500 mb-1">Адреса</p>
          <p class="text-gray-800">{{ property.location }}</p>
        </div>
        <div class="bg-white shadow rounded-xl p-6 border">
          <p class="text-sm text-gray-500 mb-1">Ціна</p>
          <p class="text-gray-800 font-semibold">{{ property.price.toLocaleString() }} грн/міс</p>
        </div>
      </div>

      <div class="bg-white shadow rounded-xl p-6 border">
        <h2 class="text-2xl font-semibold mb-2">Опис</h2>
        <p class="text-gray-700 leading-relaxed">{{ property.description }}</p>
      </div>

      <div class="flex justify-between items-center pt-4">
        <button
          @click="$router.back()"
          class="px-6 py-2 rounded text-sm font-medium bg-gray-100 hover:bg-gray-200 transition"
        >
          ← Назад
        </button>

        <button
          class="px-6 py-3 rounded text-white bg-blue-600 hover:bg-blue-700 text-lg font-semibold transition"
        >
          Зв'язатися з агентом
        </button>
      </div>
    </div>

    <div v-else class="text-center text-red-600 font-medium">
      Об'єкт не знайдено.
      <router-link to="/" class="underline text-blue-600">На головну</router-link>
    </div>
  </div>
</template>
