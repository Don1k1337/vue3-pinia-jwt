<template>
  <h2 class="text-center">Sign In</h2>
  <Message v-if="authStore.errMsg" severity="warn">
    {{ authStore.errMsg }}
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
      <Button class="h-2rem" label="Sign in" @click="signIn" />
      <span>You are not registered yet? <router-link to="/signup">Sign Up</router-link></span>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { authStore } from '@/stores'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import AppLoader from '@/components/AppLoader.vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const signIn = async () => {
  await authStore.signIn({ email: email.value, password: password.value })
  await router.push('/dashboard')
}
</script>
