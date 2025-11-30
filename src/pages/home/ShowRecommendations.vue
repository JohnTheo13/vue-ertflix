<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Show } from '~/types/Show'

const { shows } = defineProps<{
  shows: Show[]
}>()

const router = useRouter()
const currentIndex = ref(0)
const timer = ref<number | null>(null)

const currentShow = computed(() => shows[currentIndex.value])

const nextShow = () => {
  currentIndex.value = (currentIndex.value + 1) % shows.length
}

const setIndex = (index: number) => {
  currentIndex.value = index
  resetTimer()
}

const startTimer = () => {
  timer.value = window.setInterval(nextShow, 9000)
}

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

const resetTimer = () => {
  stopTimer()
  startTimer()
}

const goToDetails = () => {
  if (currentShow.value) {
    router.push(`/details/${currentShow.value.id}`)
  }
}

onMounted(() => {
  if (shows.length > 0) {
    startTimer()
  }
})

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <div class="hero" v-if="currentShow">
    <div class="hero-background">
      <img :src="currentShow.image?.original" :alt="currentShow.name" />
      <div class="overlay"></div>
    </div>
    <h1>{{ currentShow.name }}</h1>
    <div class="summary" v-html="currentShow.summary"></div>
    <button class="info-button" @click="goToDetails">More Info</button>
    <div class="dots">
      <span
        v-for="(show, index) in shows"
        :key="show.id"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="setIndex(index)"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  color: white;
  height: 70vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  padding: 0 1rem;
  padding-bottom: 0.6rem;
  box-sizing: border-box;
}

.hero h1 {
  font-size: 3rem;
  margin: 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 60%
  );
}

.summary {
  font-size: 1.2rem;
  position: relative;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  /* 100% - <dots-padding-height> - <h1-height-margin> - <button-height> */
  height: calc(100% - 1.6rem - 5rem - 6rem);
  -webkit-box-orient: vertical;
  overflow-y: hidden;
  text-overflow: ellipsis;
  width: 40%;
  margin-bottom: calc(1 * var(--base-space));
}

.info-button {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
  height: 3rem;
  width: 40%;
}

.info-button button:hover {
  transform: scale(1.05);
}

.dots {
  display: flex;
  gap: 0.5rem;
  z-index: 10;
  user-select: none;
  align-self: end;
  height: 1rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background-color: white;
}

@media (max-width: 768px) {

  .hero h1 {
    font-size: 2rem;
  }

  .summary {
    font-size: 0.9rem;
    width: 100%;
  }

  .info-button {
    width: 100%;
  }

  .dots {
    align-self: center;
  }
}

@media (max-width: 480px) {

  .hero h1 {
    font-size: 1.5rem;
  }
}
</style>
