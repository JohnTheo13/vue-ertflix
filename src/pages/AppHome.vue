<script setup lang="ts">
import ShowRow from '~/components/ShowRow.vue';
import { useGetApi } from '~/composables/useGetApi';
import type { Show } from '~/types/Show';

const { data: shows, error, loading } = useGetApi<Show[]>(`shows`);
</script>

<template>
  <hero />
  <main>
    <show-row title="Trending Now" :items="shows ?? []" />
    <show-row title="Top Rated" :items="shows ?? []" />
  </main>
</template>

<style>
body {
  background-color: #141414;
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0;
}
</style>
