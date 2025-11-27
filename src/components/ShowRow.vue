<template>
  <div class="show-row">
    <h2>{{ title }}</h2>
    <div class="row-container">
      <div class="carousel-track">
        <show-card
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :image="item.image?.medium"
          :title="item.name"
          :genre="item.genres[0] ?? 'N/A'"
          :rating="item.rating?.average?.toString() ?? 'N/A'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Show } from '~/types/Show';
import ShowCard from './ShowCard.vue';

defineProps<{
  title: string;
  items: Show[];
}>();
</script>

<style scoped>
.show-row {
  margin: 2rem 0;
}

/* -------------------------------------- */
/* 1. CONTAINER & TRACK (The Key CSS)     */
/* -------------------------------------- */

.row-container {
  padding: 0 20px; /* Add horizontal padding for a staggered start/end */
  margin-bottom: 40px;
}

.row-title {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.carousel-track {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 1rem;
  scrollbar-width: none;
}
.carousel-track::-webkit-scrollbar {
  height: 8px;
}

.carousel-track::-webkit-scrollbar-track {
  background: #4a4a4a;
  border-radius: 4px;
}

.carousel-track::-webkit-scrollbar-thumb {
  background-color: #4a4a4a;
  border-radius: 4px;
}

.carousel-track::-webkit-scrollbar-thumb:hover {
  background-color: #6a6a6a;
}

/* 🔑 KEY: Optional - Add CSS scroll snapping for a smoother user experience */
.carousel-track {
  scroll-snap-type: x mandatory;
}

/* -------------------------------------- */
/* 2. ITEM STYLING                        */
/* -------------------------------------- */

.carousel-item {
  min-width: 250px;
  margin-right: 8px;

  /* Visual styling */
  background-color: #1a1a1a;
  color: white;
  border-radius: 4px;

  /* Layout and scroll snapping */
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Apply scroll snap alignment to each item */
  scroll-snap-align: start;

  /* Optional: Hover effect for a "pop" */
  transition: transform 0.2s ease-in-out;
}

.carousel-item:hover {
  transform: scale(1.08); /* Makes the item slightly larger on hover */
  z-index: 10;
}
</style>
