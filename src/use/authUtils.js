import { ref } from 'vue'
import axiosInstance from '@/axios/axiosInstance'

export const handleAuthRequest = async (payload, url, errorMessageMappings) => {
  const loader = ref(false)
  const errorMsg = ref('')

  try {
    loader.value = true
    errorMsg.value = ''

    const response = await axiosInstance.post(url, {
      ...payload,
      returnSecureToken: true
    })

    const userInfo = {
      token: response.data.idToken,
      email: response.data.email,
      userId: response.data.localId,
      refreshToken: response.data.refreshToken,
      expiresIn: response.data.expiresIn
    }

    loader.value = false
    console.log(response)

    return {
      success: true,
      userInfo
    }
  } catch (e) {
    const errorMessage =
      errorMessageMappings[e.response.data.error.message] ||
      'Unusual error caused. Please, try again later.'

    loader.value = false
    errorMsg.value = errorMessage

    return {
      success: false,
      errorMessage
    }
  }
}
