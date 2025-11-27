<template>
  <header class="header">
    <img src="/logo.svg" alt="Erthflix" class="logo" />
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>

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
</style>
