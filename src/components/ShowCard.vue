<template>
  <div class="show-card">
      <router-link
        :to="`/details/${id}`"
        class="show-card-link"
      >
      <img :src="image" :alt="title" />
      <div class="show-card-info">
        <div>{{ genre }}</div>
        <div>{{ rating }} ⭐</div>
      </div>
    </router-link>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  image?: string;
  title: string;
  genre: string;
  rating: string;
  id: number;
}>();
</script>

<style scoped>
.show-card {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 10px;
  transition: transform 0.2s;
  user-select: none; /* Prevent text selection while dragging */
  position: relative;
}

.show-card:hover {
  transform: scale(1.05);
}

.show-card img {
  width: 100%;
  border-radius: 4px;
  pointer-events: none; /* Prevent image drag ghosting */
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
