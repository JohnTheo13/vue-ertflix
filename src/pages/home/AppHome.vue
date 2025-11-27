<script setup lang="ts">
import { inject, watch } from 'vue';
import ShowRow from '~/components/ShowRow.vue';
import { useGetApi } from '~/composables/useGetApi';
import { useGetAllShows } from '~/pages/home/useGetAllShows';
import { showsStoreKey } from '~/store/useShowsStore';
import type { Show } from '~/types/Show';

// 1. Inject the store to access its state and methods.
const showsStore = inject(showsStoreKey);
if (!showsStore) {
  throw new Error('Shows store was not provided!');
}

// 2. Destructure the reactive getters and the setter from the store.
const { dramaShows, thrillerShows, fictionShows, setShows, storeReady } =
  showsStore;
console.log(storeReady);

// 3. Use the dedicated composable to fetch the data.
const {
  error,
  loading,
  data: fetchedShows,
} = useGetApi<Show[]>('shows', !storeReady.value);

// 4. Watch the fetched data. When it changes (i.e., the fetch completes),
//    update the central store with the new data.
watch(fetchedShows, (newShows) => {
  if (newShows) {
    setShows(newShows);
  }
});
</script>

<template>

  <main>
    <!-- The template now displays data reactively from the store -->
    <div v-if="loading">Loading shows...</div>
    <div v-else-if="error">Could not load shows. Please try again later.</div>
    <template v-else>
      <show-row title="Drama" :items="dramaShows" />
      <show-row title="Thriller" :items="thrillerShows" />
      <show-row title="Science Fiction" :items="fictionShows" />
    </template>
  </main>
</template>

<style>
body {
  background-color: #141414;
  color: white;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin: 0;
}
</style>
