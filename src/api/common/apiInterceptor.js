import { authStore } from '@/stores'

const apiInterceptor = (config) => {
  let params = new URLSearchParams()
  params.append('auth', authStore.userInfo.token)
  config.params = params
  return config
}

export default apiInterceptor
