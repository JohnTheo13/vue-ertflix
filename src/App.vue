<script setup lang="ts">
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import MediaRow from './components/MediaRow.vue';
import Footer from './components/Footer.vue';

const trending = [
  { id: 1, title: 'Movie 1', image: '/placeholder.jpg' },
  { id: 2, title: 'Movie 2', image: '/placeholder.jpg' },
  { id: 3, title: 'Movie 3', image: '/placeholder.jpg' },
  { id: 4, title: 'Movie 4', image: '/placeholder.jpg' },
  { id: 5, title: 'Movie 5', image: '/placeholder.jpg' },
  { id: 6, title: 'Movie 6', image: '/placeholder.jpg' },
];

const topRated = [
  { id: 1, title: 'Movie 1', image: '/placeholder.jpg' },
  { id: 2, title: 'Movie 2', image: '/placeholder.jpg' },
  { id: 3, title: 'Movie 3', image: '/placeholder.jpg' },
  { id: 4, title: 'Movie 4', image: '/placeholder.jpg' },
  { id: 5, title: 'Movie 5', image: '/placeholder.jpg' },
  { id: 6, title: 'Movie 6', image: '/placeholder.jpg' },
];
</script>

<template>
  <Header />
  <main>
    <Hero />
    <MediaRow title="Trending Now" :items="trending" />
    <MediaRow title="Top Rated" :items="topRated" />
  </main>
  <Footer />
</template>

<style>
body {
  background-color: #141414;
  color: white;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin: 0;
}
</style>
