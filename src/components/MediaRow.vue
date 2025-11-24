<template>
  <div class="media-row">
    <h2>{{ title }}</h2>
    <div class="media-scroller">
      <div class="media-item" v-for="item in items" :key="item.id">
        <img :src="item.image" :alt="item.title" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  items: { id: number; title: string; image: string }[];
}>();
</script>

<style scoped>
.media-row {
  margin: 2rem 0;
}

h2 {
  color: white;
  margin-left: 2rem;
}

.media-scroller {
  display: flex;
  overflow-x: auto;
  padding: 1rem 2rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

.media-scroller::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
}

.media-item {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 10px;
  transition: transform 0.2s;
}

.media-item:hover {
  transform: scale(1.05);
}

.media-item img {
  width: 100%;
  border-radius: 4px;
}
</style>
