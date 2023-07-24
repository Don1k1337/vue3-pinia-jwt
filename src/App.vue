<template>
  <div class="navbar">
    <RouterLink class="navbar__link" to="/">Home</RouterLink>
    <RouterLink class="navbar__link" to="/signin" v-if="!token">SignIn</RouterLink>
    <RouterLink class="navbar__link" to="/dashboard" v-if="token">Dashboard</RouterLink>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { authStore } from '@/stores'

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'))

  if (userTokens) {
    authStore.userInfo.token = userTokens.token
    authStore.userInfo.refreshToken = userTokens.refreshToken
    authStore.userInfo.expiresIn = userTokens.expiresIn
  }

  console.log(authStore.userInfo)
}

checkUser()
</script>

<style scoped>
.container {
  margin: 4rem auto;
  font-family: Arial, sans-serif;
  max-width: 700px;
}

.navbar {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 20px;
}

.navbar__link {
  margin: 0 20px;
  text-decoration: none;
  color: #4349c0;
  font-family: 'Arial', sans-serif;
  font-weight: 700;
}
</style>
