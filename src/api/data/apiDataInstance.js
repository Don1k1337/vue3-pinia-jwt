import axios from 'axios'
import apiInterceptor from '@/api/common/apiInterceptor'

const apiDataInstance = axios.create({
  baseURL: import.meta.env.VITE_DB_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiDataInstance.interceptors.request.use(apiInterceptor)

export default apiDataInstance
