<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
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
