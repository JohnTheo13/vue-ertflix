<template>
  <div class="hero" v-if="currentShow">
    <div class="hero-background">
      <img :src="currentShow.image?.original" :alt="currentShow.name" />
      <div class="overlay"></div>
    </div>
    <div class="hero-content">
      <h1>{{ currentShow.name }}</h1>
      <div class="summary" v-html="currentShow.summary"></div>
      <div class="hero-buttons">
        <button class="info-button" @click="goToDetails">More Info</button>
      </div>
    </div>
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

<style scoped>
.hero {
  position: relative;
  color: white;
  height: 70vh;
  width: 100%;
  overflow: hidden;
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

.hero-content {
  position: absolute;
  bottom: 20%;
  left: 4rem;
  max-width: 600px;
  z-index: 10;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.summary {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero-buttons button {
  padding: 0.75rem 2rem;
  margin-right: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.hero-buttons button:hover {
  transform: scale(1.05);
}

.info-button {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
}

.dots {
  position: absolute;
  bottom: 2rem;
  right: 4rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
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
  .hero-content {
    left: 2rem;
    bottom: 15%;
    max-width: 80%;
  }

  h1 {
    font-size: 2rem;
  }

  .summary {
    font-size: 1rem;
  }

  .dots {
    right: 50%;
    transform: translateX(50%);
    bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    left: 1rem;
    bottom: 5%;
    max-width: 90%;
  }

  h1 {
    font-size: 1.5rem;
  }

  .hero-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .hero-buttons button {
    width: 100%;
    margin-right: 0;
  }
}
</style>
