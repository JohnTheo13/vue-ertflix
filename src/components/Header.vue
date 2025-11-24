<template>
  <header class="header">
    <img src="/logo.svg" alt="Erthflix" class="logo" />
    <nav>
      <a href="#">Home</a>
      <a href="#">TV Shows</a>
      <a href="#">Movies</a>
      <a href="#">New & Popular</a>
      <a href="#">My List</a>
    </nav>
    <div class="user-profile">
      <img src="/avatar.png" alt="User Profile" class="avatar" />
    </div>
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
