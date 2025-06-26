import { defineStore } from 'pinia'
import { properties } from '../constants/data'

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties,
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 6,
    selectedId: null,
  }),

  getters: {
    filteredProperties(state) {
      const query = state.searchQuery.toLowerCase()
      if (!query) return state.properties
      return state.properties.filter(
        (property) =>
          property.name.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query),
      )
    },

    paginatedProperties(state) {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return this.filteredProperties.slice(start, end)
    },

    totalPages(state) {
      return Math.ceil(this.filteredProperties.length / state.itemsPerPage)
    },

    getPropertyById: (state) => (id) => {
      return state.properties.find((p) => p.id === id)
    },
    selectedProperty(state) {
      return state.properties.find((p) => p.id === state.selectedId)
    },
  },

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query
      this.currentPage = 1
    },
    setPage(page) {
      this.currentPage = page
    },
    setSelectedId(id) {
      this.selectedId = id
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
  },
})
