import { ref } from 'vue'
import axiosInstance from '@/axios/axiosInstance'

export const handleAuthRequest = async (payload, url, errorMessageMappings) => {
  const errorMsg = ref('')

  try {
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

    console.log(response)
    return {
      success: true,
      userInfo
    }
  } catch (e) {
    const errorMessage =
      errorMessageMappings[e.response.data.error.message] ||
      'Unusual error caused. Please, try again later.'

    errorMsg.value = errorMessage

    return {
      success: false,
      errorMessage
    }
  }
}
