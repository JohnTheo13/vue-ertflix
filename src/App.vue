<script setup lang="ts">
import { provide } from 'vue'
import AppFooter from '~/components/AppFooter.vue'
import AppHeader from '~/components/AppHeader.vue'
import { createShowsStore, showsStoreKey } from './store/useShowsStore'

// Create an instance of the store
const showsStore = createShowsStore()

// Provide the store to all descendant components using the unique key
provide(showsStoreKey, showsStore)
</script>

<template>
  <app-header />
  <main>
    <router-view />
  </main>
  <app-footer />
</template>

<style>
body {
  background-color: #141414;
  color: white;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0;
}
</style>
