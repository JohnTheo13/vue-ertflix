<template>
  <div class="hero">
    <div class="hero-background">
      <img src="/hero-background.jpg" alt="Hero Background" />
    </div>
    <div class="hero-content">
      <h1>Movie Title</h1>
      <p>
        This is a brief and captivating description of the movie. It should be
        engaging and make the user want to watch it.
      </p>
      <div class="hero-buttons">
        <button class="play-button">Play</button>
        <button class="info-button">More Info</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero {
  position: relative;
  color: white;
}

.hero-background img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.hero-content {
  position: absolute;
  bottom: 20%;
  left: 4rem;
  max-width: 500px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.hero-buttons button {
  padding: 0.75rem 2rem;
  margin-right: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
}

.play-button {
  background-color: white;
  color: black;
}

.info-button {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
}
</style>
