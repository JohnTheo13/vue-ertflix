<template>
  <div class="hero">
    <div class="hero-background">
      <img src="/hero-background.jpg" alt="Hero Background" />
    </div>
    <div class="hero-content">
      <h1>Movie Title</h1>
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

@media (max-width: 768px) {
  .hero-content {
    left: 2rem;
    bottom: 10%;
    max-width: 80%;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  .hero-buttons button {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
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
