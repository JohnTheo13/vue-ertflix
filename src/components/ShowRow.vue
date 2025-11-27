<template>
  <div class="show-row">
    <h2>{{ title }}</h2>
    <div class="row-container">
      <button v-if="canScrollLeft" class="scroll-btn left" @click="scrollLeft">‹</button>
      <div class="carousel-track" ref="track" @scroll="checkScroll">
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
      <button v-if="canScrollRight" class="scroll-btn right" @click="scrollRight">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { Show } from '~/types/Show';
import ShowCard from './ShowCard.vue';

defineProps<{
  title: string;
  items: Show[];
}>();

const track = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

const checkScroll = () => {
  if (track.value) {
    const { scrollLeft, scrollWidth, clientWidth } = track.value;
    canScrollLeft.value = scrollLeft > 0;
    // Allow a small buffer (1px) for float precision issues
    canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1;
  }
};

const scrollLeft = () => {
  if (track.value) {
    track.value.scrollBy({ left: -600, behavior: 'smooth' });
    // checkScroll will be triggered by the scroll event
  }
};

const scrollRight = () => {
  if (track.value) {
    track.value.scrollBy({ left: 600, behavior: 'smooth' });
    // checkScroll will be triggered by the scroll event
  }
};

onMounted(() => {
  checkScroll();
  window.addEventListener('resize', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScroll);
});

</script>

<style scoped>
.show-row {
  margin: 2rem 0;
}

.row-container {
  position: relative;
  padding: 0 20px; 
  margin-bottom: 40px;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  z-index: 10;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.scroll-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.scroll-btn.left {
  left: 0;
}

.scroll-btn.right {
  right: 0;
}

@media (hover: none) and (pointer: coarse) {
  .scroll-btn {
    display: none;
  }
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
  z-index: 1;
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

.carousel-track {
  scroll-snap-type: x mandatory;
}

</style>
