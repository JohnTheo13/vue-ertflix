<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ShowCard from '~/components/ShowCard.vue'
import type { Show } from '~/types/Show'

defineProps<{
  title: string
  items: Show[]
}>()

const track = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const checkScroll = () => {
  if (track.value) {
    const { scrollLeft, scrollWidth, clientWidth } = track.value
    canScrollLeft.value = scrollLeft > 0
    // Allow a small buffer (1px) for float precision issues
    canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1
  }
}

// Calculate scroll amount based on card width and gap
const getScrollAmount = () => {
  if (!track.value || !track.value.firstElementChild) return 0
  const card = track.value.firstElementChild as HTMLElement
  const gap = parseFloat(window.getComputedStyle(track.value).gap) || 0
  return (card.offsetWidth + gap) * 3
}

const scrollLeft = () => {
  if (track.value) {
    const scrollAmount = getScrollAmount()
    track.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    // checkScroll will be triggered by the scroll event
  }
}

const scrollRight = () => {
  if (track.value) {
    const scrollAmount = getScrollAmount()
    track.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    // checkScroll will be triggered by the scroll event
  }
}

onMounted(() => {
  checkScroll()
  window.addEventListener('resize', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScroll)
})
</script>

<template>
  <div class="show-row">
    <h2>{{ title }}</h2>
    <div class="row-container">
      <button v-if="canScrollLeft" class="scroll-btn left" @click="scrollLeft">
        ‹
      </button>
      <div class="carousel-track" ref="track" @scroll="checkScroll">
        <show-card
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :image="item.image?.medium"
          :title="item.name"
          :rating="item.rating?.average?.toString() ?? 'N/A'"
        />
      </div>
      <button
        v-if="canScrollRight"
        class="scroll-btn right"
        @click="scrollRight"
      >
        ›
      </button>
    </div>
  </div>
</template>

<style scoped>
.show-row {
  margin: 2rem 0;
  width: 100%;
}

.row-container {
  position: relative;
  margin: auto;
  margin-bottom: 40px;
  width: calc(6 * var(--card-width-desktop) + 4.6rem); /* 6 cards + gaps */
  max-width: 100%;
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
  left: -20px;
}

.scroll-btn.right {
  right: -20px;
}

@media (hover: none) and (pointer: coarse) {
  .scroll-btn {
    display: none;
  }
}

@media (max-width: var(--breakpoint-tablet)) {
  .row-container {
    width: calc(4 * var(--card-width-desktop) + 3.6rem); /* 4 cards + gaps */
  }
}

.row-title {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.carousel-track {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--row-gap);
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
