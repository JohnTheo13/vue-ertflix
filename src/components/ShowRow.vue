<template>
  <div class="show-row">
    <h2>{{ title }}</h2>
    <div
      class="show-scroller"
      ref="scroller"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    >
      <show-card
        v-for="item in items"
        :key="item.id"
        :image="item.image?.medium"
        :title="item.name"
        :genre="item.genres[0] ?? 'N/A'"
        :rating="item.rating?.average?.toString() ?? 'N/A'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Show } from '~/types/Show';
import ShowCard from './ShowCard.vue';

defineProps<{
  title: string;
  items: Show[];
}>();

const scroller = ref<HTMLElement | null>(null);
const isDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
// TODO: Refactor
const onMouseDown = (e: MouseEvent) => {
  if (!scroller.value) return;
  isDown.value = true;
  scroller.value.classList.add('active');
  startX.value = e.pageX - scroller.value.offsetLeft;
  scrollLeft.value = scroller.value.scrollLeft;
};

const onMouseLeave = () => {
  if (!scroller.value) return;
  isDown.value = false;
  scroller.value.classList.remove('active');
};

const onMouseUp = () => {
  if (!scroller.value) return;
  isDown.value = false;
  scroller.value.classList.remove('active');
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDown.value || !scroller.value) return;
  e.preventDefault();
  const x = e.pageX - scroller.value.offsetLeft;
  const walk = (x - startX.value) * 1; // The multiplier adjusts scroll speed
  scroller.value.scrollLeft = scrollLeft.value - walk;
};
</script>

<style scoped>
.show-row {
  margin: 2rem 0;
}

h2 {
  color: white;
  margin-left: 2rem;
}

.show-scroller {
  display: flex;
  overflow-x: auto;
  padding: 1rem 2rem;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #4a4a4a transparent;
  cursor: grab;
  overflow-x: hidden;
}

.show-scroller.active {
  cursor: grabbing;
  cursor: -webkit-grabbing;
}

.show-scroller::-webkit-scrollbar {
  height: 8px;
}

.show-scroller::-webkit-scrollbar-track {
  background: transparent;
}

.show-scroller::-webkit-scrollbar-thumb {
  background-color: #4a4a4a;
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.show-scroller::-webkit-scrollbar-thumb:hover {
  background-color: #6a6a6a;
}

</style>
