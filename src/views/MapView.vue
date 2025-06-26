<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import maplibregl from 'maplibre-gl'
import { useRouter } from 'vue-router'
import { usePropertyStore } from '../stores/propertyStore'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapContainer = ref(null)
const map = ref(null)
const store = usePropertyStore()
const router = useRouter()

onMounted(() => {
  map.value = new maplibregl.Map({
    container: mapContainer.value,
    style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=xnrstKe3MYfHpaUMXusH',
    center: [30.5234, 50.4501],
    zoom: 12,
  })

  map.value.addControl(new maplibregl.NavigationControl(), 'top-right')

  map.value.on('load', () => {
    const geojson = {
      type: 'FeatureCollection',
      features: store.properties.map((p) => ({
        type: 'Feature',
        geometry: p.geometry,
        properties: {
          id: p.id,
          name: p.name,
          location: p.location,
          price: p.price,
        },
      })),
    }

    map.value.addSource('properties', {
      type: 'geojson',
      data: geojson,
    })

    map.value.addLayer({
      id: 'property-points',
      type: 'circle',
      source: 'properties',
      paint: {
        'circle-radius': 7,
        'circle-color': '#dc2626',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      },
    })
    map.value.on('click', 'property-points', (e) => {
      const id = e.features[0].properties.id
      router.push({ name: 'property', params: { id } })
    })
    map.value.on('mouseenter', 'property-points', () => {
      map.value.getCanvas().style.cursor = 'pointer'
    })
    map.value.on('mouseleave', 'property-points', () => {
      map.value.getCanvas().style.cursor = ''
    })
  })
})

onUnmounted(() => {
  map.value?.remove()
})
</script>

<template>
  <div class="w-full px-4 py-4">
    <div
      ref="mapContainer"
      class="w-full max-w-6xl h-[75vh] mx-auto rounded-xl border border-gray-300 shadow-lg"
    />
  </div>
</template>
