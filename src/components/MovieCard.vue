<template>
  <div class="movie-card">
    <img :src="image" :alt="title" />
    <div class="movie-card-info">
      <div>{{ genre }}</div>
      <div>{{ rating }} ⭐</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  genre: string;
  rating: number;
}>();
</script>

<style scoped>
.movie-card {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 10px;
  transition: transform 0.2s;
  user-select: none; /* Prevent text selection while dragging */
  position: relative;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 4px;
  pointer-events: none; /* Prevent image drag ghosting */
}

.movie-card-info {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  bottom: 8px;
  color: white;
  font-size: 0.9rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}


</style>
