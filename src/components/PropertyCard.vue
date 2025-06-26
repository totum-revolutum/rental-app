<script setup>
defineProps({
  property: {
    type: Object,
    required: true,
  },
})

defineEmits(['click'])
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    @click="$emit('click')"
  >
    <div class="h-48 bg-gray-200 flex items-center justify-center">
      <span class="text-gray-500">Зображення приміщення</span>
    </div>
    <div class="p-4">
      <h3 class="text-xl font-bold mb-2">{{ property.name }}</h3>
      <p class="text-gray-600 mb-2">{{ property.location }}</p>
      <p class="text-blue-600 font-bold">{{ property.price }} ₴/міс</p>
    </div>
  </div>
</template>
