<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGetApi } from '~/composables/useGetApi';
import type { Show } from '~/types/Show';

const router = useRouter();
const route = useRoute();

const searchQuery = ref((route.query.q as string) || '');
let debounceTimeout: number | undefined;

// Initialize useGetApi with disabled auto-fetch
const {
  data: results,
  loading: isLoading,
  fetchData,
} = useGetApi<{ score: number; show: Show }[]>('shows', false);

// Watch for changes in input and debounce the search
watch(searchQuery, (newQuery) => {
  // Update URL query param
  router.replace({ query: { ...route.query, q: newQuery || undefined } });

  if (debounceTimeout) clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    if (newQuery.trim()) {
      fetchData(`search/shows?q=${newQuery}`);
    } else {
      results.value = [];
    }
  }, 500) as unknown as number;
});

onMounted(() => {
  if (searchQuery.value.trim()) {
    fetchData(`search/shows?q=${searchQuery.value}`);
  }
});

const navigateToShow = (id: number) => {
  router.push(`/details/${id}`);
};
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
      <div
        v-for="show in results"
        :key="show.show.id"
        class="show-card"
        @click="navigateToShow(show.show.id)"
      >
        <img
          v-if="show.show.image"
          :src="show.show.image.medium"
          :alt="show.show.name"
          class="show-thumbnail"
        />
        <div v-else class="placeholder-img">No Image</div>
        <div class="show-info">
          <h3>{{ show.show.name }}</h3>
        </div>
      </div>
    </div>

    <div v-else-if="searchQuery && !isLoading" class="empty-state">
      No results found for "{{ searchQuery }}"
    </div>
  </div>
</template>

<style scoped>
.search-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-top: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #42b983;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.show-card {
  cursor: pointer;
  transition: transform 0.2s;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.show-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.show-thumbnail {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  display: block;
}

.show-info {
  padding: 1rem;
}

.show-info h3 {
  margin: 0;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
}
</style>
