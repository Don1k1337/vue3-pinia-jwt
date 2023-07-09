<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
.container {
  margin: 4rem auto;
  font-family: Arial, sans-serif;
  max-width: 700px;
}
</style>
