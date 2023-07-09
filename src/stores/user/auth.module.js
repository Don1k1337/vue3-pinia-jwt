import { ref } from 'vue'
import { defineStore } from 'pinia'
import { firebaseConfig } from '@/config/firebaseConfig'
import axiosInstance from '@/axios/axiosInstance'

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  })

  const errorMsg = ref('')
  const loader = ref(false)

  const signUp = async (payload) => {
    loader.value = true
    errorMsg.value = ''

    try {
      const url = `:signUp?key=${firebaseConfig.apiKey}`
      let response = await axiosInstance.post(url, {
        ...payload,
        returnSecureToken: true
      })
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
      loader.value = false
      console.log(response)
    } catch (e) {
      switch (e.response.data.error.message) {
        case 'EMAIL_EXISTS':
          errorMsg.value = 'Sorry, this email is already in use. Please, choose another one.'
          break
        case 'OPERATION_NOT_ALLOWED':
          errorMsg.value = 'Password sign-in is disabled for this app.'
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMsg.value =
            'All requests from this device has been blocked due to unusual activity. Please, try again later.'
          break
        default:
          errorMsg.value = 'Unusual error caused. Please, try again later.'
          break
      }
      loader.value = false
    }
  }

  return { signUp, userInfo, errorMsg, loader }
})
