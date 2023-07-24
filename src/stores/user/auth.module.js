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

  const errorMappings = {
    signUp: {
      EMAIL_EXISTS: 'Sorry, this email is already in use. Please choose another one.',
      OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this app.',
      TOO_MANY_ATTEMPTS_TRY_LATER:
        'All requests from this device have been blocked due to unusual activity. Please try again later.'
    },
    signIn: {
      EMAIL_NOT_FOUND: 'Sorry, the provided email was not found in the database.',
      INVALID_PASSWORD: 'The provided password is incorrect.',
      USER_DISABLED: 'Unfortunately, the user account has been disabled by an administrator.'
    }
  }

  const signUp = async (payload) => {
    loader.value = true
    const url = `:signUp?key=${firebaseConfig.apiKey}`

    const {
      success,
      userInfo: signedUpUserInfo,
      errorMessage
    } = await handleAuthRequest(payload, url, errorMappings.signUp)

    loader.value = false
    if (success) {
      userInfo.value = signedUpUserInfo
    } else {
      errMsg.value = errorMessage
    }
  }

  const signIn = async (payload) => {
    loader.value = true
    const url = `:signInWithPassword?key=${firebaseConfig.apiKey}`

    const {
      success,
      userInfo: signedInUserInfo,
      errorMessage
    } = await handleAuthRequest(payload, url, errorMappings.signIn)

    if (success) {
      userInfo.value = signedInUserInfo
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
          expiresIn: userInfo.value.expiresIn
        })
      )
    } else {
      errMsg.value = errorMessage
      throw errMsg.value
    }
  }

  return { signUp, signIn, userInfo, errMsg, loader }
})
