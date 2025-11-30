<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ShowCard from '~/components/ShowCard.vue'
import { useGetApi } from '~/composables/useGetApi'
import type { Show } from '~/types/Show'

const router = useRouter()
const route = useRoute()

const searchQuery = ref((route.query.q as string) || '')
let debounceTimeout: number | undefined

// Initialize useGetApi with disabled auto-fetch
const {
  data: results,
  fetchData,
  loading: isLoading,
} = useGetApi<{ score: number; show: Show }[]>('shows', false)

// Watch for changes in input and debounce the search
watch(searchQuery, (newQuery) => {
  // Update URL query param
  router.replace({ query: { ...route.query, q: newQuery || undefined } })

  if (debounceTimeout) clearTimeout(debounceTimeout)

  debounceTimeout = setTimeout(() => {
    if (newQuery.trim()) {
      const sanitizedQuery = encodeURIComponent(newQuery.trim())
      fetchData(`search/shows?q=${sanitizedQuery}`)
    } else {
      results.value = []
    }
  }, 500) as unknown as number
})
onMounted(() => {
  if (searchQuery.value.trim()) {
    const sanitizedQuery = encodeURIComponent(searchQuery.value.trim())
    fetchData(`search/shows?q=${sanitizedQuery}`)
  }
})
</script>

<template>
  <div class="search-page">
    <div class="search-header">
      <h1>Search Shows</h1>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Type to search..."
        class="search-input"
        autofocus
      />
    </div>

    <div v-if="isLoading" class="loading-state">Searching...</div>

    <div v-else-if="results && results.length > 0" class="results-grid">
      <show-card
        v-for="show in results"
        :key="show.show.id"
        :id="show.show.id"
        :image="show.show.image?.medium"
        :title="show.show.name"
        :genre="show.show.genres[0]"
        :rating="show.show.rating?.average?.toString() ?? 'N/A'"
      />
    </div>

    <div
      v-if="
        searchQuery.length > 0 &&
        !isLoading &&
        (!results || results.length === 0)
      "
      class="empty-state"
    >
      No results found for "{{ searchQuery }}"
    </div>
  </div>
</template>

<style scoped>
.search-page {
  padding: 1rem 2rem;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.search-header {
  margin-bottom: 2rem;
  text-align: center;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  font-size: 1.2rem;
  border: 2px solid #444;
  border-radius: 8px;
  margin-top: 1rem;
  transition: border-color 0.3s;
  
  box-sizing: border-box; 
  display: block;
  margin-left: auto;
  margin-right: auto;

  background-color: black;
  color: white;
}

.search-input:focus {
  outline: none;
  border-color: white;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-width-desktop), 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  justify-items: center;
}
.loading-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #888;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .search-page {
    padding: 1rem;
  }

  .search-input {
    font-size: 1rem;
    padding: 0.8rem 1rem;
  }

  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(var(--card-width-mobile), 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .search-header h1 {
    font-size: 1.5rem;
  }

  .results-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>
