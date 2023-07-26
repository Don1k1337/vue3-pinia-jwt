import axios from 'axios'
import router from '@/router'
import { authStore } from '@/stores'
import { firebaseConfig } from '@/config/firebaseConfig'

const apiAxiosInstance = axios.create()
apiAxiosInstance.interceptors.request.use((config) => {
  const url = config.url
  if (!url.includes('signInWithPassword') && !url.includes('signUp')) {
    let params = new URLSearchParams()
    params.append('auth', authStore.userInfo.token)
    config.params = params
  }
  return config
})

apiAxiosInstance.interceptors.response.use(
  (response) => {
    console.log('Request interceptor triggered')
    return response
  },
  async function (err) {
    const originalReq = err.config
    if (err.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true
      try {
        console.log('Before token refresh request')
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`,
          {
            grant_type: 'refresh_token',
            refresh_token: JSON.parse(localStorage.getItem('userTokens')).refreshToken
          }
        )
        console.log('After token refresh request')
        authStore.userInfo.token = newTokens.data.access_token
        authStore.userInfo.refreshToken = newTokens.data.refresh_token
        localStorage.setItem(
          'userTokens',
          JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.refresh_token
          })
        )

        console.log(newTokens.data)
      } catch (err) {
        console.log('Error while refreshing token:', err)
        localStorage.removeItem('userTokens')
        router.push('/signin')
        authStore.userInfo.token = ''
      }
    }
    console.log('Other error:', err)
  }
)

export default apiAxiosInstance
