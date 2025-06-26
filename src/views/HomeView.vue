<script setup>
import { watch } from 'vue'
import { usePropertyStore } from '../stores/propertyStore'
import PropertyCard from '@/components/PropertyCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = usePropertyStore()

function goToProperty(id) {
  router.push({ name: 'property', params: { id } })
}

watch(
  () => store.searchQuery,
  () => {
    store.currentPage = 1
  },
)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <input
        v-model="store.searchQuery"
        type="text"
        placeholder="Пошук за назвою або локацією"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PropertyCard
        v-for="property in store.paginatedProperties"
        :key="property.id"
        :property="property"
        @click="goToProperty(property.id)"
      />
    </div>

    <div class="flex justify-center mt-8">
      <button
        v-for="page in store.totalPages"
        :key="page"
        @click="store.setPage(page)"
        :class="[
          'mx-1 px-4 py-2 rounded',
          store.currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300',
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>
