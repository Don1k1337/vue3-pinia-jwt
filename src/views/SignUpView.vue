<template>
  <h2 class="text-center">Sign Up</h2>
  <Message v-if="authStore.errorMsg" severity="warn">
    {{ authStore.errorMsg }}
  </Message>
  <form class="flex flex-column gap-3">
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText type="email" v-model="email" placeholder="Your Email" />
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-at"></i>
      </span>
      <InputText type="password" v-model="password" placeholder="Password" />
    </div>
    <AppLoader v-if="authStore.loader" />
    <div v-else class="flex flex-column gap-3">
      <Button class="h-2rem" label="Sign Up" @click="signUp" />
      <span>Are you already registered?</span>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { authStore } from '@/stores'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import AppLoader from "@/components/AppLoader.vue"

const email = ref('')
const password = ref('')

const signUp = async () => {
  await authStore.signUp({ email: email.value, password: password.value })
}
</script>

<style scoped></style>
