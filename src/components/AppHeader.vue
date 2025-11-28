<script setup lang="ts">
</script>

<template>
  <header class="header">
    <img src="/logo.svg" alt="Erthflix" class="logo" />
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #141414;
  color: white;
}

.logo {
  height: 30px;
}

nav a {
  margin-left: 1rem;
  color: white;
  text-decoration: none;
}

.avatar {
  height: 30px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .logo {
    height: 24px;
  }

  nav a {
    margin-left: 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
