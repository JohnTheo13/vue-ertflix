<script setup lang="ts">
import { inject, watch } from 'vue'
import ShowRow from '~/components/ShowRow.vue'
import { useGetApi } from '~/composables/useGetApi'
import { showsStoreKey } from '~/store/useShowsStore'
import type { Show } from '~/types/Show'

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
</script>

<template>
  <div v-if="loading">Loading shows...</div>
  <div v-else-if="error">Could not load shows. Please try again later.</div>
  <template v-else>
    <show-row title="Drama" :items="dramaShows" />
    <show-row title="Thriller" :items="thrillerShows" />
    <show-row title="Science Fiction" :items="fictionShows" />
    <show-row title="Comedy" :items="comedyShows" />
    <show-row title="Action" :items="actionShows" />
  </template>
</template>

<style></style>
