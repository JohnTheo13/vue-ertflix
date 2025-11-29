<script setup lang="ts">
import { computed, inject, watch } from 'vue'
import { useGetApi } from '~/composables/useGetApi'
import ShowRecommendations from '~/pages/home/ShowRecommendations.vue'
import { showsStoreKey } from '~/store/useShowsStore'
import type { Show } from '~/types/Show'
import ShowRow from './ShowRow.vue'

const showsStore = inject(showsStoreKey)
if (!showsStore) {
  throw new Error('Shows store was not provided!')
}

const {
  dramaShows,
  thrillerShows,
  fictionShows,
  setShows,
  storeReady,
  comedyShows,
  actionShows,
  allShows,
} = showsStore

const {
  error,
  loading,
  data: fetchedShows,
} = useGetApi<Show[]>('shows', !storeReady.value)

watch(fetchedShows, (newShows) => {
  if (newShows) {
    setShows(newShows)
  }
})

const recommendedShows = computed(() => {
  if (allShows.value.length > 0) {
    /**
     * Given that shows are sorted by rating, we most likely get the top 10
     * displayed in the home screen rows.
     * We choose to display recommendations starting after the first 10,
     * selecting a different group of shows for each week of the year.
     * and filter only those with images.
     */
    const weekNumber = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) /
        (7 * 24 * 60 * 60 * 1000),
    )
    return allShows.value
      .slice(10 + weekNumber, 16 + weekNumber)
      .filter((s) => s.image?.original)
  }
  return []
})
</script>

<template>
  <div v-if="loading">Loading shows...</div>
  <div v-else-if="error">Could not load shows: {{ error.message }}</div>
  <template v-else>
    <show-recommendations :shows="recommendedShows" />
    <show-row title="Drama" :items="dramaShows" />
    <show-row title="Thriller" :items="thrillerShows" />
    <show-row title="Science Fiction" :items="fictionShows" />
    <show-row title="Comedy" :items="comedyShows" />
    <show-row title="Action" :items="actionShows" />
  </template>
</template>

<style></style>
