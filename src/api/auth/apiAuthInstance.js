import axios from 'axios'

const apiAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiAuthInstance
