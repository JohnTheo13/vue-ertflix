<template>
  <footer class="footer">
    <div class="footer-links">
      <a href="#">FAQ</a>
      <a href="#">Help Center</a>
      <a href="#">Account</a>
      <a href="#">Media Center</a>
      <a href="#">Investor Relations</a>
      <a href="#">Jobs</a>
      <a href="#">Ways to Watch</a>
      <a href="#">Terms of Use</a>
      <a href="#">Privacy</a>
      <a href="#">Cookie Preferences</a>
      <a href="#">Corporate Information</a>
      <a href="#">Contact Us</a>
      <a href="#">Speed Test</a>
      <a href="#">Legal Notices</a>
      <a href="#">Only on Erthflix</a>
    </div>
    <div class="copyright">
      &copy; 2025 Erthflix, Inc.
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  padding: 2rem;
  background-color: #141414;
  color: #808080;
  margin-top: 2rem;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.footer-links a {
  color: #808080;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
