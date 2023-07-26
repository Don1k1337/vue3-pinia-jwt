<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div class="dashboard__loader" v-if="showLoader">
      <AppLoader class="mx-auto" />
    </div>
    <div class="flex flex-column gap-3" v-else>
      <Card v-for="note in notes" :key="note.id">
        <template #title> {{ note.title }} </template>
        <template #content> {{ note.content }} </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppLoader from '@/components/AppLoader.vue'
import Card from 'primevue/card'
import apiAxiosInstance from '@/api/common/apiAxiosInstance'

const notes = ref()
const showLoader = ref(false)

const getAllNotes = async () => {
  try {
    showLoader.value = true
    const response = await apiAxiosInstance.get(`${import.meta.env.VITE_DB_URL}/notes.json`)
    notes.value = response.data
  } catch (e) {
    console.log(e.response)
  } finally {
    showLoader.value = false
  }
}

onMounted(async () => {
  await getAllNotes()
})
</script>

<style scoped>
.dashboard__loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
