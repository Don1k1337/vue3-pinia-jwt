import { ref } from 'vue'
import { defineStore } from 'pinia'
import { firebaseConfig } from '@/config/firebaseConfig'
import { handleAuthRequest } from '@/use/authUtils'

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  })

  const errMsg = ref('')
  const loader = ref(false)

  const signUp = async (payload) => {
    const url = `:signUp?key=${firebaseConfig.apiKey}`
    const errorMsgMappings = {
      EMAIL_EXISTS: 'Sorry, this email is already in use. Please choose another one.',
      OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this app.',
      TOO_MANY_ATTEMPTS_TRY_LATER:
        'All requests from this device have been blocked due to unusual activity. Please try again later.'
    }

    const { success, userInfo, errorMessage } = await handleAuthRequest(
      payload,
      url,
      errorMsgMappings
    )

    if (success) {
      userInfo.value = userInfo
    } else {
      errMsg.value = errorMessage
    }
  }

  const signIn = async (payload) => {
    const url = `:signInWithPassword?key=${firebaseConfig.apiKey}`
    const errorMsgMappings = {
      EMAIL_NOT_FOUND: 'Sorry, the provided email was not found in the database.',
      INVALID_PASSWORD: 'The provided password is incorrect.',
      USER_DISABLED: 'Unfortunately, the user account has been disabled by an administrator.'
    }

    const { success, userInfo, errorMessage } = await handleAuthRequest(
      payload,
      url,
      errorMsgMappings
    )

    if (success) {
      userInfo.value = userInfo
    } else {
      errMsg.value = errorMessage
    }
  }

  return { signUp, signIn, userInfo, errMsg, loader }
})
