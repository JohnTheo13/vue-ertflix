<template>
  <button class="show-card" @click="navigateToShow(id)">
      <img :src="image" :alt="title" />
      <div class="show-card-info">
        <div>{{ genre }}</div>
        <div>{{ rating }} ⭐</div>
      </div>
  </button>
</template>

<script setup lang="ts">
import { router } from '~/router';

defineProps<{
  image?: string;
  title: string;
  genre: string;
  rating: string;
  id: number;
}>();

const navigateToShow = (id: number) => {
  router.push(`/details/${id}`);
};
</script>

<style scoped>
.show-card {
  flex: 0 0 auto;
  width: 100%;
  max-width: 240px;
  margin: 0 auto;
  transition: transform 0.2s;
  user-select: none;
  position: relative;

  /* Reset button styles */
  background: none;
  border: none;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

@media (max-width: 768px) {
  .show-card {
    max-width: 180px;
  }
}

@media (max-width: 480px) {
  .show-card {
    max-width: 150px;
  }
}

.show-card:hover {
  transform: scale(1.05);
}

.show-card img {
  width: 100%;
  border-radius: 4px;
  pointer-events: none;
}

.show-card-info {
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
