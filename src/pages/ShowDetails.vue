<template>
  <div class="show-details" v-if="!loading && show">
    <!-- Background Image -->
    <div class="backdrop" v-if="show.image?.original">
      <img :src="show.image.original" :alt="show.name" />
    </div>
    <h1>{{ show.name }}</h1>
    <div class="content">
      <!-- Metadata Row -->
      <div class="meta-row">
        <span class="rating" v-if="show.rating?.average">
          ⭐ {{ show.rating.average }}
        </span>
        <span class="year" v-if="show.premiered">
          {{ new Date(show.premiered).getFullYear() }}
        </span>
        <span class="runtime" v-if="show.runtime">
          {{ show.runtime }} min
        </span>
        <span class="status">{{ show.status }}</span>
      </div>

      <!-- Genres -->
      <div class="genres">
        <span v-for="genre in show.genres" :key="genre" class="genre-pill">
          {{ genre }}
        </span>
      </div>

      <!-- Summary (HTML) -->
      <div class="summary" v-html="sanitizedSummary"></div>

      <!-- Additional Info Grid -->
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Language</span>
          <span class="value">{{ show.language }}</span>
        </div>
        <div class="info-item" v-if="show.network">
          <span class="label">Network</span>
          <span class="value">{{ show.network.name }}</span>
        </div>
        <div class="info-item">
          <span class="label">Type</span>
          <span class="value">{{ show.type }}</span>
        </div>
        <div class="info-item" v-if="show.officialSite">
          <span class="label">Website</span>
          <a
            :href="show.officialSite"
            target="_blank"
            class="value link"
            rel="noopener noreferrer"
            >Visit Official Site</a
          >
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="error" class="center-msg">
    <p>Error loading show details.</p>
    <p>{{ error.message }}</p>
  </div>

  <div v-else class="center-msg">
    <!-- Skeleton Loader here -->
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGetApi } from '~/composables/useGetApi';
import type { Show } from '~/types/Show'; // Ensure this type matches your interface

const { params } = useRoute();
const { data: show, error, loading } = useGetApi<Show>(`shows/${params.id}`);

const sanitizedSummary = computed(() => {
  if (show.value?.summary) {
    // Sanitization function can be added here
    return show.value.summary;
  }
  return '';
});
</script>

<style scoped>
.show-details {
  position: relative;
  isolation: isolate; /* Create a new stacking context */
  min-height: 100vh;
  color: white;
  overflow: hidden;
  user-select: none;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}

.backdrop img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}

.content {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 30vh; /* Push content down to reveal background */
}

.meta-row {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
}

.rating {
  color: #ffd700;
}

.genres {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.genre-pill {
  background: rgba(255, 255, 255, 0.15);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
}

.summary {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: #e0e0e0;
  max-width: 700px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  color: #888;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.value {
  font-size: 1.1rem;
  font-weight: 500;
}

.link {
  color: #e50914;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.center-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.5rem;
  color: #888;
}
</style>
