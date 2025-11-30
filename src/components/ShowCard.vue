<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  image?: string
  title: string
  genre?: string
  rating: string
  id: number
  className?: string
}>()

const navigateToShow = (id: number) => {
  router.push(`/details/${id}`)
}
</script>

<template>
  <button :class="['show-card', className]" @click="navigateToShow(id)">
    <div class="show-card-info">
      <span>{{ genre }}</span>
      <span>{{ rating }} ⭐</span>
    </div>
    <img :src="image" :alt="title" />
  </button>
</template>

<style scoped>
.show-card {
  flex: 0 0 auto;
  width: var(--card-width-desktop);
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

.show-card:hover {
  transform: scale(1.08);
}

.show-card img {
  width: 100%;
  border-radius: 4px;
  pointer-events: none;
}

.show-card-info {
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 0 1.2rem;
  align-items: flex-end;
  top: 1rem;
  width: 100%;
  box-sizing: border-box;
  left: 0;
  color: white;
  font-size: 1.2rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.829);
  background-color: rgba(95, 158, 160, 0.493);
}

/* @media (max-width: 768px) {
  .show-card-info {
    font-size: 0.8rem;
  }
  
} */

@media (max-width: 768px) {
  .show-card {
    width: var(--card-width-mobile);
  }
  .show-card-info {
    font-size: 0.8rem;
  }
}

</style>
